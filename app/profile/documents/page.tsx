"use client";

import { useState } from "react";
import Link from "next/link";
import { Upload, FileText, Download, Check, X, Clock, AlertCircle, Shield, Eye, Trash2 } from "lucide-react";

export default function DocumentsPage() {
    const [uploading, setUploading] = useState<string | null>(null);

    const documents = [
        {
            id: "doc-1",
            name: "Driver's License",
            type: "identity",
            status: "verified",
            uploadDate: "2026-01-15",
            expiryDate: "2028-12-31",
            fileUrl: "#",
            description: "Valid government-issued driver's license",
            required: true
        },
        {
            id: "doc-2",
            name: "Passport",
            type: "identity",
            status: "pending",
            uploadDate: "2026-02-01",
            expiryDate: "2034-06-15",
            fileUrl: "#",
            description: "International passport for identity verification",
            required: true
        },
        {
            id: "doc-3",
            name: "Insurance Card",
            type: "insurance",
            status: "missing",
            uploadDate: null,
            expiryDate: null,
            fileUrl: null,
            description: "Valid auto insurance card",
            required: true
        },
        {
            id: "doc-4",
            name: "Utility Bill",
            type: "address",
            status: "verified",
            uploadDate: "2026-01-10",
            expiryDate: null,
            fileUrl: "#",
            description: "Recent utility bill for address verification",
            required: true
        },
        {
            id: "doc-5",
            name: "Credit Card Authorization",
            type: "payment",
            status: "verified",
            uploadDate: "2026-01-20",
            expiryDate: null,
            fileUrl: "#",
            description: "Signed credit card authorization form",
            required: false
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "verified": return "bg-green-900/50 text-green-400";
            case "pending": return "bg-yellow-900/50 text-yellow-400";
            case "missing": return "bg-red-900/50 text-red-400";
            case "expired": return "bg-orange-900/50 text-orange-400";
            default: return "bg-gray-900/50 text-gray-400";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "verified": return <Check size={16} />;
            case "pending": return <Clock size={16} />;
            case "missing": return <X size={16} />;
            case "expired": return <AlertCircle size={16} />;
            default: return null;
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "identity": return <Shield size={20} />;
            case "insurance": return <FileText size={20} />;
            case "address": return <FileText size={20} />;
            case "payment": return <FileText size={20} />;
            default: return <FileText size={20} />;
        }
    };

    const handleUpload = (docId: string) => {
        setUploading(docId);
        // Simulate upload process
        setTimeout(() => {
            setUploading(null);
            // Show success message (in real app, you'd update the document status)
            alert('Document uploaded successfully! It will be reviewed within 1-2 business days.');
        }, 2000);
    };

    const handleViewDocument = (docId: string) => {
        // In a real app, this would open the document
        alert(`Viewing document: ${docId}`);
    };

    const handleDownloadDocument = (docId: string) => {
        // In a real app, this would download the document
        alert(`Downloading document: ${docId}`);
    };

    const handleDeleteDocument = (docId: string) => {
        // In a real app, this would delete the document
        if (confirm('Are you sure you want to delete this document?')) {
            alert(`Document deleted: ${docId}`);
        }
    };

    const requiredDocuments = documents.filter(doc => doc.required);
    const optionalDocuments = documents.filter(doc => !doc.required);
    const verifiedCount = documents.filter(doc => doc.status === "verified").length;
    const totalCount = documents.length;
    const completionPercentage = Math.round((verifiedCount / totalCount) * 100);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black pt-28">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/profile" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
                        ← Back to Profile
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-2">Documents</h1>
                    <p className="text-gray-400">Manage and upload your verification documents</p>
                </div>

                {/* Progress Overview */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-1">Document Verification Progress</h3>
                            <p className="text-gray-400">{verifiedCount} of {totalCount} documents verified</p>
                        </div>
                        <div className="text-right">
                            <p className="text-3xl font-bold text-white">{completionPercentage}%</p>
                            <p className="text-sm text-gray-400">Complete</p>
                        </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                        <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${completionPercentage}%` }}
                        />
                    </div>
                </div>

                {/* Security Notice */}
                <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-4 mb-8">
                    <div className="flex items-start gap-3">
                        <Shield size={20} className="text-blue-400 mt-0.5" />
                        <div>
                            <h4 className="font-semibold text-blue-400 mb-2">Document Security</h4>
                            <p className="text-sm text-blue-300 mb-2">
                                All documents are encrypted and stored securely. We only use them for verification purposes and never share them with third parties.
                            </p>
                            <div className="grid md:grid-cols-3 gap-3 text-sm">
                                <div className="flex items-center gap-2 text-blue-300">
                                    <Check size={14} />
                                    256-bit encryption
                                </div>
                                <div className="flex items-center gap-2 text-blue-300">
                                    <Check size={14} />
                                    Secure storage
                                </div>
                                <div className="flex items-center gap-2 text-blue-300">
                                    <Check size={14} />
                                    Privacy protection
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Required Documents */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">Required Documents</h3>
                    <div className="space-y-4">
                        {requiredDocuments.map((doc) => (
                            <div key={doc.id} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                        {getTypeIcon(doc.type)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h4 className="font-semibold text-white mb-1">{doc.name}</h4>
                                                <p className="text-sm text-gray-400 mb-2">{doc.description}</p>
                                                <div className="flex items-center gap-4 text-sm text-gray-400">
                                                    {doc.uploadDate && (
                                                        <span>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</span>
                                                    )}
                                                    {doc.expiryDate && (
                                                        <span>Expires: {new Date(doc.expiryDate).toLocaleDateString()}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(doc.status)}`}>
                                                    {getStatusIcon(doc.status)}
                                                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Document Actions */}
                                        <div className="flex gap-3">
                                            {doc.status === "missing" && (
                                                <>
                                                    <button 
                                                        onClick={() => handleUpload(doc.id)}
                                                        disabled={uploading === doc.id}
                                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors flex items-center gap-2"
                                                    >
                                                        {uploading === doc.id ? (
                                                            <>
                                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                                Uploading...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Upload size={16} />
                                                                Upload Document
                                                            </>
                                                        )}
                                                    </button>
                                                </>
                                            )}
                                            {doc.status === "pending" && (
                                                <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors flex items-center gap-2">
                                                        <Upload size={16} />
                                                        Re-upload
                                                    </button>
                                            )}
                                            {doc.fileUrl && (
                                                <>
                                                    <button 
                                                        onClick={() => handleViewDocument(doc.id)}
                                                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
                                                    >
                                                        <Eye size={16} />
                                                        View
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDownloadDocument(doc.id)}
                                                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
                                                    >
                                                        <Download size={16} />
                                                        Download
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteDocument(doc.id)}
                                                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
                                                    >
                                                        <Trash2 size={16} />
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        {/* Status Messages */}
                                        {doc.status === "pending" && (
                                            <div className="mt-3 bg-yellow-900/20 border border-yellow-800 rounded-lg p-3">
                                                <p className="text-sm text-yellow-300">
                                                    <Clock size={14} className="inline mr-1" />
                                                    Your document is under review. This typically takes 1-2 business days.
                                                </p>
                                            </div>
                                        )}
                                        {doc.status === "verified" && (
                                            <div className="mt-3 bg-green-900/20 border border-green-800 rounded-lg p-3">
                                                <p className="text-sm text-green-300">
                                                    <Check size={14} className="inline mr-1" />
                                                    Document verified successfully. Valid until {doc.expiryDate && new Date(doc.expiryDate).toLocaleDateString()}.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Optional Documents */}
                {optionalDocuments.length > 0 && (
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Optional Documents</h3>
                        <div className="space-y-4">
                            {optionalDocuments.map((doc) => (
                                <div key={doc.id} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 opacity-75">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                            {getTypeIcon(doc.type)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h4 className="font-semibold text-white mb-1">{doc.name}</h4>
                                                    <p className="text-sm text-gray-400 mb-2">{doc.description}</p>
                                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                                        {doc.uploadDate && (
                                                            <span>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(doc.status)}`}>
                                                        {getStatusIcon(doc.status)}
                                                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                                    </span>
                                                    <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">Optional</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                {doc.fileUrl && (
                                                    <>
                                                        <button 
                                                            onClick={() => handleViewDocument(doc.id)}
                                                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
                                                        >
                                                            <Eye size={16} />
                                                            View
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDownloadDocument(doc.id)}
                                                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
                                                        >
                                                            <Download size={16} />
                                                            Download
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Upload Guidelines */}
                <div className="mt-8 bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                    <h4 className="font-semibold text-white mb-3">Upload Guidelines</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                        <div>
                            <h5 className="font-medium text-white mb-2">File Requirements:</h5>
                            <ul className="space-y-1">
                                <li>• PDF, JPG, or PNG format</li>
                                <li>• Maximum file size: 10MB</li>
                                <li>• Minimum resolution: 300dpi</li>
                                <li>• Clear, readable, and unobstructed</li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="font-medium text-white mb-2">Acceptable Documents:</h5>
                            <ul className="space-y-1">
                                <li>• Government-issued ID (Driver's License, Passport)</li>
                                <li>• Recent utility bills (gas, electric, water)</li>
                                <li>• Bank statements or credit card statements</li>
                                <li>• Insurance cards or policy documents</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
