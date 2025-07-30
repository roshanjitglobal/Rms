import React, { useState } from 'react';
import { Plus, Eye, FileText, Users, Upload, X } from 'lucide-react';

const HrManageJDs = () => {
  const [jdList, setJdList] = useState([
    { id: 1, title: 'Frontend Developer', date: '2025-07-25', fileName: 'frontend-jd.pdf', applications: 42, status: 'Open' },
    { id: 2, title: 'Backend Developer', date: '2025-07-26', fileName: 'backend-jd.pdf', applications: 19, status: 'In Progress' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [selectedJdForUpload, setSelectedJdForUpload] = useState(null);
  const [newJD, setNewJD] = useState({ title: '', file: null, status: 'Open' });
  const [bulkResumes, setBulkResumes] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isBulkUploading, setIsBulkUploading] = useState(false);

  const handleFileChange = (e) => {
    setNewJD({ ...newJD, file: e.target.files[0] });
  };

  const handleBulkResumeChange = (e) => {
    const files = Array.from(e.target.files);
    setBulkResumes(files);
  };

  const handleSubmit = () => {
    if (newJD.title && newJD.file) {
      setIsUploading(true);
      setTimeout(() => {
        const newEntry = {
          id: jdList.length + 1,
          title: newJD.title,
          date: new Date().toISOString().split('T')[0],
          fileName: newJD.file.name,
          applications: 0,
          status: newJD.status,
        };
        setJdList([newEntry, ...jdList]);
        setShowModal(false);
        setNewJD({ title: '', file: null, status: 'Open' });
        setIsUploading(false);
      }, 1000);
    }
  };

  const handleBulkUpload = () => {
    if (bulkResumes.length > 0 && selectedJdForUpload) {
      setIsBulkUploading(true);
      setTimeout(() => {
        // Update applications count for the selected JD
        setJdList(jdList.map(jd => 
          jd.id === selectedJdForUpload.id 
            ? { ...jd, applications: jd.applications + bulkResumes.length }
            : jd
        ));
        setShowBulkUploadModal(false);
        setBulkResumes([]);
        setSelectedJdForUpload(null);
        setIsBulkUploading(false);
      }, 2000); // Simulate bulk upload delay
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setJdList(jdList.map(jd => jd.id === id ? { ...jd, status: newStatus } : jd));
  };

  const openBulkUploadModal = (jd) => {
    setSelectedJdForUpload(jd);
    setShowBulkUploadModal(true);
  };

  const closeBulkUploadModal = () => {
    setShowBulkUploadModal(false);
    setBulkResumes([]);
    setSelectedJdForUpload(null);
  };

  const removeResumeFile = (index) => {
    setBulkResumes(bulkResumes.filter((_, i) => i !== index));
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Closed':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22 width=%2280%22 height=%2280%22%3E%3Cpath fill=%22%23e5e7eb%22 d=%22M0 0h80v80H0z%22/%3E%3Cpath fill=%22%23f3f4f6%22 d=%22M40 0h40v40H40zM0 40h40v40H0z%22/%3E%3C/svg%3E')]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
          Job Description Hub
        </h2>
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-full hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          onClick={() => setShowModal(true)}
        >
          <Plus size={20} /> New JD
        </button>
      </div>

      {/* JD Summary Card */}
      <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl p-6 rounded-2xl w-fit mb-8 transform transition-all hover:shadow-2xl">
        <h3 className="text-sm font-medium text-gray-600">Total Job Descriptions</h3>
        <p className="text-4xl font-bold text-indigo-600">{jdList.length}</p>
      </div>

      {/* JD Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {jdList.map((jd) => (
          <div
            key={jd.id}
            className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <FileText className="text-indigo-600 flex-shrink-0" size={28} />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 leading-tight">{jd.title}</h4>
                  <p className="text-xs text-gray-500">Uploaded: {jd.date}</p>
                  <p className="text-xs text-gray-400 truncate max-w-[180px]">{jd.fileName}</p>
                </div>
              </div>
              <select
                className={`text-xs font-semibold rounded-full px-3 py-1 border ${getStatusStyles(jd.status)} focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-200`}
                value={jd.status}
                onChange={(e) => handleStatusChange(jd.id, e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="text-indigo-600" size={16} />
                <p className="text-sm font-medium text-gray-600">{jd.applications} Applications</p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm font-medium transition-colors duration-200">
                <Eye size={16} /> View
              </button>
            </div>

            {/* Bulk Upload Button */}
            <button
              onClick={() => openBulkUploadModal(jd)}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center justify-center gap-2 text-sm font-medium mb-3"
            >
              <Upload size={16} /> Upload Bulk Resumes
            </button>

            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((jd.applications / 50) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Application Progress</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload JD Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all scale-100 animate-in">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Upload New Job Description</h3>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">JD Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50"
                  value={newJD.title}
                  onChange={(e) => setNewJD({ ...newJD, title: e.target.value })}
                  placeholder="Enter job description title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                <select
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50"
                  value={newJD.status}
                  onChange={(e) => setNewJD({ ...newJD, status: e.target.value })}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Upload JD File</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition-all duration-200"
                  onChange={handleFileChange}
                />
                {newJD.file && (
                  <p className="mt-2 text-sm text-gray-600 flex items-center gap-1">
                    <FileText size={14} /> Selected: {newJD.file.name}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
                  onClick={() => setShowModal(false)}
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button
                  className={`px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:from-indigo-700 hover:to-blue-600 transition-all duration-200 flex items-center gap-2 ${
                    isUploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handleSubmit}
                  disabled={isUploading || !newJD.title || !newJD.file}
                >
                  {isUploading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    'Upload'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Resume Upload Modal */}
      {showBulkUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-2xl w-full max-w-2xl shadow-2xl transform transition-all scale-100 animate-in max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Upload Bulk Resumes for: {selectedJdForUpload?.title}
              </h3>
              <button
                onClick={closeBulkUploadModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Multiple Resume Files
                </label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:bg-green-100 file:text-green-700 hover:file:bg-green-200 transition-all duration-200"
                  onChange={handleBulkResumeChange}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: PDF, DOC, DOCX. You can select multiple files at once.
                </p>
              </div>

              {/* Selected Files List */}
              {bulkResumes.length > 0 && (
                <div className="border rounded-lg p-4 bg-gray-50 max-h-60 overflow-y-auto">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Selected Files ({bulkResumes.length})
                  </h4>
                  <div className="space-y-2">
                    {bulkResumes.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white p-3 rounded-lg border"
                      >
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-green-600" />
                          <span className="text-sm text-gray-700 truncate max-w-xs">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          onClick={() => removeResumeFile(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
                  onClick={closeBulkUploadModal}
                  disabled={isBulkUploading}
                >
                  Cancel
                </button>
                <button
                  className={`px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg hover:from-green-700 hover:to-emerald-600 transition-all duration-200 flex items-center gap-2 ${
                    isBulkUploading || bulkResumes.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handleBulkUpload}
                  disabled={isBulkUploading || bulkResumes.length === 0}
                >
                  {isBulkUploading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Uploading {bulkResumes.length} resumes...
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      Upload {bulkResumes.length} Resume{bulkResumes.length !== 1 ? 's' : ''}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HrManageJDs;