import { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
// import Sidebar from '../../components/hr/Sidebar';

// Constants
const ALLOWED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ManageJD = ({ handleSearch, handleJDCreate, handleCVUpload }) => {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [activeModal, setActiveModal] = useState(null); // 'jd-create' or 'cv-upload'
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [targetJDId, setTargetJDId] = useState(null);

  // Memoized values
  const validateFile = useCallback((file) => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return { isValid: false, error: 'Invalid file type. Please upload PDF or Word documents.' };
    }
    if (file.size > MAX_FILE_SIZE) {
      return { isValid: false, error: 'File size exceeds 5MB limit.' };
    }
    return { isValid: true };
  }, []);

  // Event Handlers
  const handleSaveUpload = useCallback(async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one file to upload.');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      if (activeModal === 'jd-create') {
        await handleJDCreate(selectedFiles);
      } else if (activeModal === 'cv-upload') {
        await handleCVUpload(selectedFiles, targetJDId);
      }
      setActiveModal(null);
      setSelectedFiles([]);
    } catch (err) {
      setError(`Failed to upload files. ${err.message || 'Please try again.'}`);
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  }, [selectedFiles, activeModal, targetJDId, handleJDCreate, handleCVUpload]);

  const handleFileSelect = useCallback((e) => {
    try {
      const files = Array.from(e.target.files || []);
      const validFiles = [];
      const errors = [];

      files.forEach(file => {
        const validation = validateFile(file);
        if (validation.isValid) {
          validFiles.push(file);
        } else {
          errors.push(`${file.name}: ${validation.error}`);
        }
      });

      if (errors.length > 0) {
        setError(errors.join('\n'));
        setTimeout(() => setError(null), 5000);
      }

      if (validFiles.length > 0) {
        setSelectedFiles(prev => [...prev, ...validFiles]);
      }
    } catch (err) {
      setError('Error processing files. Please try again.');
      console.error('File selection error:', err);
    }
  }, [validateFile]);

  const handleFileAction = useCallback((file, action) => {
    if (action === 'remove') {
      setSelectedFiles(prev => prev.filter((f) => f !== file));
    }
  }, []);

  // Component: SearchBar
  const SearchBar = useCallback(() => (
    <div className="flex items-center gap-4 w-full">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search Job Descriptions..."
          className="w-full p-3 pl-10 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={searchQuery}
          onChange={(e) => {
            const value = e.target.value;
            setSearchQuery(value);
            handleSearch(value);
          }}
          aria-label="Search job descriptions"
        />
        <svg 
          className="w-5 h-5 text-blue-600 absolute left-3 top-1/2 transform -translate-y-1/2" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  ), [searchQuery, handleSearch]);

  // Component: JDCard
  const JDCard = useCallback(({ id, title }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-blue-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{title || `Job Description ${id}`}</h3>
        <div className="flex space-x-2">
          <button
            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={() => {
              setActiveModal('cv-upload');
              setTargetJDId(id);
              setSelectedFiles([]);
            }}
            aria-label={`Upload CV for Job Description ${id}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  ), []);

  // Component: UploadModal
  const UploadModal = useCallback(() => {
    const isCVUpload = activeModal === 'cv-upload';
    const modalTitle = isCVUpload 
      ? `Upload CV for Job Description ${targetJDId}` 
      : 'Create New Job Description';
      
    const uploadButtonText = isCVUpload 
      ? (isUploading ? 'Uploading CV...' : 'Upload CV') 
      : (isUploading ? 'Creating JD...' : 'Create JD');

    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-modal-title"
      >
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 id="upload-modal-title" className="text-2xl font-bold text-gray-800">
              {modalTitle}
            </h2>
            <button
              onClick={() => {
                setActiveModal(null);
                setSelectedFiles([]);
                setError(null);
              }}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="file-upload">
              {isCVUpload ? 'Upload CV Files (PDF, DOC, DOCX)' : 'Upload Job Description Files (PDF, DOC, DOCX)'}
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50/50 transition-colors hover:border-blue-300">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                  >
                    <span>Select files</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      className="sr-only"
                      onChange={handleFileSelect}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX up to 5MB
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {selectedFiles.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Files ({selectedFiles.length})</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto p-2 border rounded-md bg-gray-50">
                {selectedFiles.map((file) => (
                  <div 
                    key={`${file.name}-${file.lastModified}`} 
                    className="flex justify-between items-center bg-white p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center min-w-0">
                      <svg className="flex-shrink-0 h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                      </svg>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFileAction(file, 'remove')}
                      className="ml-2 text-red-600 hover:text-red-800 focus:outline-none transition-colors"
                      aria-label={`Remove ${file.name}`}
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 hover:text-gray-900 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors"
              onClick={() => {
                setActiveModal(null);
                setSelectedFiles([]);
                setError(null);
              }}
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`px-6 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                isUploading || selectedFiles.length === 0
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={handleSaveUpload}
              disabled={isUploading || selectedFiles.length === 0}
            >
              {isUploading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {uploadButtonText}
                </div>
              ) : (
                uploadButtonText
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }, [selectedFiles, error, isUploading, activeModal, targetJDId, handleFileSelect, handleFileAction, handleSaveUpload]);

  // Memoize the JD cards
  const jdCards = useMemo(() => 
    [
      { id: 1, title: "Software Engineer" },
      { id: 2, title: "UX Designer" },
      { id: 3, title: "Product Manager" }
    ].map((jd) => <JDCard key={jd.id} id={jd.id} title={jd.title} />)
  , []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex">
      {/* Sidebar */}
      {/* <Sidebar /> */}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-4 py-3">
            <SearchBar />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Job Descriptions</h1>
            <p className="text-gray-600 mt-1">Manage your job descriptions and candidate resumes</p>
          </div>
        </div>

        {/* JD Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jdCards}
        </div>
        </main>

        {/* Floating Action Button */}
      <div className="fixed right-6 bottom-20 z-40 flex flex-col items-end space-y-2">
        <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
          <span className="px-4 text-sm font-medium text-gray-700 whitespace-nowrap">
            {activeModal ? 'Close' : 'Upload JD'}
          </span>
          <button
            className={`p-4 rounded-full shadow-xl transition-all duration-300 transform ${
              activeModal 
                ? 'bg-red-500 hover:bg-red-600 rotate-45' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
            onClick={() => {
              setActiveModal(activeModal ? null : 'jd-create');
              setTargetJDId(null);
              setSelectedFiles([]);
            }}
            aria-label={activeModal ? 'Close form' : 'Upload new job description'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

        {/* Upload Modal */}
        {activeModal && <UploadModal />}
      </div>
    </div>
  );
};

// PropTypes validation
ManageJD.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleJDCreate: PropTypes.func.isRequired,
  handleCVUpload: PropTypes.func.isRequired,
};

export default ManageJD;
