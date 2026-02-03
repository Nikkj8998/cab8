import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Eye, 
  Download, 
  Trash2, 
  Phone, 
  Mail, 
  CheckCircle2,
  FileText,
  Calendar,
  MapPin,
  Briefcase,
  X,
  RefreshCw,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from 'sonner';
import { api } from '../services/api';

interface JobApplication {
  id: number;
  job_id: number;
  job_title: string;
  department: string;
  location: string;
  type: string;
  full_name: string;
  email: string;
  phone: string;
  linkedin_url?: string;
  portfolio_url?: string;
  years_of_experience: string;
  current_company?: string;
  current_role?: string;
  notice_period: string;
  expected_salary?: string;
  cover_letter?: string;
  resume_path: string;
  status: string;
  created_at: string;
}

export const JobApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [selectedApplications, setSelectedApplications] = useState<number[]>([]);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      else setRefreshing(true);
      
      const response = await api.jobApplications.getAll();
      
      if (!response.success && response.authenticated === false) {
        toast.error('Please login to access this page');
        navigate('/admin/login');
        return;
      }
      
      if (response.success && response.data) {
        setApplications(response.data);
      } else {
        setApplications([]);
        toast.error(response.message || 'Failed to load job applications');
      }
    } catch (error) {
      setApplications([]);
      toast.error('Error loading job applications');
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleViewApplication = (application: JobApplication) => {
    setSelectedApplication(application);
    setViewDialogOpen(true);
  };

  const handleDownloadResume = (id: number, fullName: string) => {
    const downloadUrl = api.jobApplications.downloadResume(id);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `Resume_${fullName.replace(/\s/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Resume download started');
  };

  const handleStatusChange = async (id: number, status: string) => {
    try {
      const response = await api.jobApplications.updateStatus(id, status);
      
      if (!response.success && response.authenticated === false) {
        toast.error('Session expired. Please login again.');
        navigate('/admin/login');
        return;
      }
      
      if (response.success) {
        setApplications(applications.map(app => 
          app.id === id ? { ...app, status } : app
        ));
        toast.success('Application status updated');
      } else {
        toast.error(response.message || 'Failed to update status');
      }
    } catch (error) {
      toast.error('Error updating status');
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await api.jobApplications.delete(id);
      
      if (!response.success && response.authenticated === false) {
        toast.error('Session expired. Please login again.');
        navigate('/admin/login');
        return;
      }
      
      if (response.success) {
        setApplications(applications.filter(app => app.id !== id));
        setSelectedApplications(prev => prev.filter(appId => appId !== id));
        setDeleteId(null);
        toast.success('Application deleted successfully');
      } else {
        toast.error(response.message || 'Failed to delete application');
      }
    } catch (error) {
      toast.error('Error deleting application');
      console.error(error);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedApplications.length === 0) return;

    try {
      const results = await Promise.all(
        selectedApplications.map(id => api.jobApplications.delete(id))
      );

      const successCount = results.filter(r => r.success).length;
      
      if (successCount > 0) {
        setApplications(prev => prev.filter(app => !selectedApplications.includes(app.id)));
        setSelectedApplications([]);
        toast.success(`Successfully deleted ${successCount} applications`);
      } else {
        toast.error('Failed to delete applications');
      }
      setBulkDeleteDialogOpen(false);
    } catch (error) {
      toast.error('Error during bulk deletion');
      console.error(error);
    }
  };

  const toggleSelectApplication = (id: number) => {
    setSelectedApplications(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const pageAppIds = paginatedApplications.map(a => a.id);
    const allSelected = pageAppIds.every(id => selectedApplications.includes(id));
    if (allSelected) {
      setSelectedApplications(prev => prev.filter(id => !pageAppIds.includes(id)));
    } else {
      setSelectedApplications(prev => [...new Set([...prev, ...pageAppIds])]);
    }
  };

  const handleCallApplicant = (phone: string, name: string) => {
    window.location.href = `tel:${phone}`;
    toast.success(`Calling ${name}...`);
  };

  const handleEmailApplicant = (email: string, name: string, jobTitle: string) => {
    const subject = encodeURIComponent(`Regarding your application for ${jobTitle}`);
    const body = encodeURIComponent(`Dear ${name},\n\nThank you for applying for the ${jobTitle} position at Cybaem Tech.\n\n`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      (app.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.job_title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.phone || '').includes(searchQuery);
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 p-4 sm:p-6 space-y-6 max-w-full overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Job Applications</h1>
            <p className="text-gray-500">Manage and review all job applications</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {selectedApplications.length > 0 && (
              <Button
                variant="destructive"
                onClick={() => setBulkDeleteDialogOpen(true)}
                className="flex-1 sm:flex-none"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Delete Selected</span> ({selectedApplications.length})
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => loadApplications(false)}
              disabled={refreshing}
              className="flex-1 sm:flex-none"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        <Card className="border-none shadow-sm ring-1 ring-gray-200">
          <CardHeader className="pb-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, phone, or job title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Filter className="h-4 w-4 text-gray-400" />
                <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setCurrentPage(1); }}>
                  <SelectTrigger className="w-[160px] h-10">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 sm:p-6">
            {loading ? (
              <div className="flex justify-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No applications found</h3>
                <p className="text-sm text-gray-500 max-w-xs mx-auto mt-1">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your search or filter criteria'
                    : 'Applications will appear here once candidates apply'}
                </p>
              </div>
            ) : (
              <>
                {/* Desktop View Table */}
                <div className="hidden md:block rounded-lg border border-gray-200 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-50/50">
                      <TableRow>
                        <TableHead className="w-[50px] pl-6">
                          <div 
                            className="flex items-center justify-center cursor-pointer h-8 w-8 hover:bg-gray-100 rounded"
                            onClick={toggleSelectAll}
                          >
                            <div className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${
                              paginatedApplications.length > 0 && paginatedApplications.every(a => selectedApplications.includes(a.id))
                                ? 'bg-blue-600 border-blue-600'
                                : 'bg-white border-gray-300'
                            }`}>
                              {paginatedApplications.length > 0 && paginatedApplications.every(a => selectedApplications.includes(a.id)) && (
                                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-900">Applicant</TableHead>
                        <TableHead className="font-semibold text-gray-900">Position</TableHead>
                        <TableHead className="font-semibold text-gray-900">Applied Date</TableHead>
                        <TableHead className="font-semibold text-gray-900">Status</TableHead>
                        <TableHead className="text-right pr-6 font-semibold text-gray-900">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedApplications.map((application) => (
                        <TableRow key={application.id} className={`hover:bg-gray-50/50 transition-colors ${selectedApplications.includes(application.id) ? 'bg-blue-50/30' : ''}`}>
                          <TableCell className="pl-6">
                            <div 
                              className="flex items-center justify-center cursor-pointer h-8 w-8 hover:bg-gray-100 rounded"
                              onClick={() => toggleSelectApplication(application.id)}
                            >
                              <div className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${
                                selectedApplications.includes(application.id)
                                  ? 'bg-blue-600 border-blue-600'
                                  : 'bg-white border-gray-300'
                              }`}>
                                {selectedApplications.includes(application.id) && (
                                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">{application.full_name || 'N/A'}</span>
                              <span className="text-xs text-gray-500">{application.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">{application.job_title || 'N/A'}</span>
                              <span className="text-xs text-gray-500">{application.department}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {formatDate(application.created_at)}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={application.status}
                              onValueChange={(value) => handleStatusChange(application.id, value)}
                            >
                              <SelectTrigger className="h-8 w-[130px] text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="reviewed">Reviewed</SelectItem>
                                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell className="text-right pr-6">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                                onClick={() => handleCallApplicant(application.phone, application.full_name)}
                                title="Call"
                              >
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                                onClick={() => handleEmailApplicant(application.email, application.full_name, application.job_title)}
                                title="Email"
                              >
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                                onClick={() => handleViewApplication(application)}
                                title="View Details"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                                onClick={() => handleDownloadResume(application.id, application.full_name)}
                                title="Download Resume"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => setDeleteId(application.id)}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-4 flex items-center justify-between px-2">
                    <div className="text-sm text-gray-500">
                      Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredApplications.length)}</span> of <span className="font-medium">{filteredApplications.length}</span> results
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={`h-8 w-8 p-0 ${currentPage === page ? 'bg-primary text-white' : 'text-gray-600'}`}
                          >
                            {page}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="h-8 w-8 p-0"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Mobile View Cards */}
                <div className="md:hidden divide-y divide-gray-100">
                  {paginatedApplications.map((application) => (
                    <div 
                      key={application.id} 
                      className={`p-4 space-y-3 transition-colors ${selectedApplications.includes(application.id) ? 'bg-blue-50/30' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div 
                            className="flex items-center justify-center cursor-pointer h-8 w-8 hover:bg-gray-100 rounded mt-0.5"
                            onClick={() => toggleSelectApplication(application.id)}
                          >
                            <div className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${
                              selectedApplications.includes(application.id)
                                ? 'bg-blue-600 border-blue-600'
                                : 'bg-white border-gray-300'
                            }`}>
                              {selectedApplications.includes(application.id) && (
                                <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{application.full_name}</h3>
                            <p className="text-xs text-gray-500">#{application.id} • {formatDate(application.created_at)}</p>
                          </div>
                        </div>
                        <Select
                          value={application.status}
                          onValueChange={(value) => handleStatusChange(application.id, value)}
                        >
                          <SelectTrigger className="h-7 w-[110px] text-[10px] font-bold uppercase tracking-wider">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="reviewed">Reviewed</SelectItem>
                            <SelectItem value="shortlisted">Shortlisted</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 gap-2 text-sm ml-11">
                        <div className="flex items-center gap-2 text-gray-700 font-medium">
                          <Briefcase className="h-3.5 w-3.5 text-blue-600" />
                          <span>{application.job_title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="h-3.5 w-3.5 text-gray-400" />
                          <span className="truncate">{application.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="h-3.5 w-3.5 text-gray-400" />
                          <span>{application.phone}</span>
                        </div>
                      </div>

                      <div className="flex justify-end items-center gap-1 pt-2 border-t border-gray-50">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-blue-600 hover:bg-blue-50"
                          onClick={() => handleViewApplication(application)}
                        >
                          <Eye className="h-4 w-4 mr-1.5" />
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-blue-600 hover:bg-blue-50"
                          onClick={() => handleDownloadResume(application.id, application.full_name)}
                        >
                          <Download className="h-4 w-4 mr-1.5" />
                          Resume
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-red-600 hover:bg-red-50"
                          onClick={() => setDeleteId(application.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4 border-t pt-4">
                    <p className="text-sm text-gray-500">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredApplications.length)} of {filteredApplications.length}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="h-9"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="h-9"
                      >
                        Next <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* View Application Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto w-[95vw] sm:w-full p-0 sm:p-6 overflow-x-hidden">
            <div className="p-4 sm:p-0">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Application Details</DialogTitle>
                <DialogDescription>
                  Complete information about the applicant
                </DialogDescription>
              </DialogHeader>
              
              {selectedApplication && (
                <div className="space-y-6 mt-6 pb-6">
                  {/* Applicant Info */}
                  <div className="bg-gray-50/50 rounded-lg p-4 border border-gray-200">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Full Name</p>
                        <p className="font-medium text-gray-900">{selectedApplication.full_name}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Email</p>
                        <p className="font-medium text-gray-900 truncate">{selectedApplication.email}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Phone</p>
                        <p className="font-medium text-gray-900">{selectedApplication.phone}</p>
                      </div>
                      {selectedApplication.linkedin_url && (
                        <div>
                          <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">LinkedIn</p>
                          <a href={selectedApplication.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate block font-medium">
                            View Profile
                          </a>
                        </div>
                      )}
                      {selectedApplication.portfolio_url && (
                        <div>
                          <p className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-1">Portfolio</p>
                          <a href={selectedApplication.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate block font-medium">
                            View Portfolio
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-blue-900">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                      Job Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-blue-600/70 font-bold mb-1">Position Applied For</p>
                        <p className="font-semibold text-blue-900">{selectedApplication.job_title}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-blue-600/70 font-bold mb-1">Department</p>
                        <p className="font-medium text-blue-900">{selectedApplication.department}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-blue-600/70 font-bold mb-1">Location preference</p>
                        <p className="font-medium text-blue-900">{selectedApplication.location}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-blue-600/70 font-bold mb-1">Job Type</p>
                        <p className="font-medium text-blue-900">{selectedApplication.type}</p>
                      </div>
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div className="bg-green-50/50 rounded-lg p-4 border border-green-100">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-green-900">
                      <Calendar className="h-5 w-5 text-green-600" />
                      Professional Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-green-600/70 font-bold mb-1">Experience</p>
                        <p className="font-medium text-green-900">{selectedApplication.years_of_experience}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-green-600/70 font-bold mb-1">Notice Period</p>
                        <p className="font-medium text-green-900">{selectedApplication.notice_period}</p>
                      </div>
                      {selectedApplication.current_company && (
                        <div>
                          <p className="text-xs uppercase tracking-wider text-green-600/70 font-bold mb-1">Current Company</p>
                          <p className="font-medium text-green-900">{selectedApplication.current_company}</p>
                        </div>
                      )}
                      {selectedApplication.current_role && (
                        <div>
                          <p className="text-xs uppercase tracking-wider text-green-600/70 font-bold mb-1">Current Role</p>
                          <p className="font-medium text-green-900">{selectedApplication.current_role}</p>
                        </div>
                      )}
                      {selectedApplication.expected_salary && (
                        <div>
                          <p className="text-xs uppercase tracking-wider text-green-600/70 font-bold mb-1">Expected Salary</p>
                          <p className="font-medium text-green-900">{selectedApplication.expected_salary}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cover Letter */}
                  {selectedApplication.cover_letter && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5 text-gray-600" />
                        Cover Letter
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedApplication.cover_letter}</p>
                      </div>
                    </div>
                  )}

                  {/* Actions Sticky Footer for Dialog */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t mt-6 sticky bottom-0 bg-white sm:bg-transparent -mx-4 -mb-4 p-4 sm:p-0">
                    <Button
                      onClick={() => handleCallApplicant(selectedApplication.phone, selectedApplication.full_name)}
                      className="flex-1 w-full"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Applicant
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleEmailApplicant(selectedApplication.email, selectedApplication.full_name, selectedApplication.job_title)}
                      className="flex-1 w-full"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDownloadResume(selectedApplication.id, selectedApplication.full_name)}
                      className="flex-1 w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Resume
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent className="w-[95vw] sm:w-full rounded-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this job application and the associated resume file. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => deleteId && handleDelete(deleteId)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Bulk Delete Confirmation Dialog */}
        <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
          <AlertDialogContent className="w-[95vw] sm:w-full rounded-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Multiple Applications?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {selectedApplications.length} selected applications? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleBulkDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};