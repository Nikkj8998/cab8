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
  ChevronRight,
  LayoutDashboard,
  Users,
  Clock,
  CheckCircle,
  AlertCircle
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
  const [activeTab, setActiveTab] = useState<'list' | 'dashboard'>('list');
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
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-200 shadow-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab('dashboard')}
                className={`h-9 px-4 text-sm font-semibold transition-all rounded-lg ${
                  activeTab === 'dashboard' 
                    ? 'bg-white text-blue-600 shadow-md ring-1 ring-black/5' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab('list')}
                className={`h-9 px-4 text-sm font-semibold transition-all rounded-lg ${
                  activeTab === 'list' 
                    ? 'bg-white text-blue-600 shadow-md ring-1 ring-black/5' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <FileText className="h-4 w-4 mr-2" />
                Applications
              </Button>
            </div>

            <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block" />
            
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Job Applications</h1>
              <p className="text-xs font-medium text-gray-400 hidden sm:block">Professional Recruitment Overview</p>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {activeTab === 'list' && selectedApplications.length > 0 && (
              <Button
                variant="destructive"
                onClick={() => setBulkDeleteDialogOpen(true)}
                className="flex-1 sm:flex-none h-9 text-xs"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Delete Selected</span> ({selectedApplications.length})
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => loadApplications(false)}
              disabled={refreshing}
              className="flex-1 sm:flex-none h-9 text-xs"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {activeTab === 'dashboard' ? (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-none shadow-sm ring-1 ring-gray-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Applications</p>
                      <h3 className="text-2xl font-bold mt-1">{applications.length}</h3>
                      <p className="text-xs text-green-600 mt-1 font-medium">+12% from last month</p>
                    </div>
                    <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm ring-1 ring-gray-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending Review</p>
                      <h3 className="text-2xl font-bold mt-1">
                        {applications.filter(a => a.status === 'pending').length}
                      </h3>
                      <p className="text-xs text-amber-600 mt-1 font-medium">Requires attention</p>
                    </div>
                    <div className="h-12 w-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                      <Clock className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm ring-1 ring-gray-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Shortlisted</p>
                      <h3 className="text-2xl font-bold mt-1">
                        {applications.filter(a => a.status === 'shortlisted').length}
                      </h3>
                      <p className="text-xs text-blue-600 mt-1 font-medium">Potential hires</p>
                    </div>
                    <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm ring-1 ring-gray-200 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Rejection Rate</p>
                      <h3 className="text-2xl font-bold mt-1">
                        {applications.length > 0 
                          ? Math.round((applications.filter(a => a.status === 'rejected').length / applications.length) * 100) 
                          : 0}%
                      </h3>
                      <p className="text-xs text-red-600 mt-1 font-medium">Final decisions</p>
                    </div>
                    <div className="h-12 w-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                      <AlertCircle className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Applications by Status */}
              <Card className="border-none shadow-sm ring-1 ring-gray-200 bg-white">
                <CardHeader className="pb-2">
                  <h3 className="font-bold text-lg">Applications by Status</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 py-2">
                    {['pending', 'reviewed', 'shortlisted', 'contacted', 'rejected'].map((status) => {
                      const count = applications.filter(a => a.status === status).length;
                      const percentage = applications.length > 0 ? (count / applications.length) * 100 : 0;
                      return (
                        <div key={status} className="space-y-1.5">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize text-gray-600 font-medium">{status}</span>
                            <span className="font-bold">{count}</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                status === 'shortlisted' ? 'bg-indigo-500' :
                                status === 'pending' ? 'bg-amber-500' :
                                status === 'rejected' ? 'bg-red-500' :
                                'bg-blue-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-none shadow-sm ring-1 ring-gray-200 bg-white">
                <CardHeader className="pb-2">
                  <h3 className="font-bold text-lg">Recent Applications</h3>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {applications.slice(0, 5).map((app) => (
                      <div key={app.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm">
                            {app.full_name?.charAt(0) || '?'}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{app.full_name}</p>
                            <p className="text-xs text-gray-500">{app.job_title}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="text-[10px] capitalize h-5">
                            {app.status}
                          </Badge>
                          <p className="text-[10px] text-gray-400 mt-1">{formatDate(app.created_at)}</p>
                        </div>
                      </div>
                    ))}
                    {applications.length === 0 && (
                      <div className="p-8 text-center text-gray-500 text-sm italic">
                        No recent applications found
                      </div>
                    )}
                  </div>
                  <div className="p-4 border-t border-gray-100">
                    <Button 
                      variant="ghost" 
                      className="w-full text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => setActiveTab('list')}
                    >
                      View All Applications
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Application Trends/Departments */}
            <Card className="border-none shadow-sm ring-1 ring-gray-200 bg-white">
              <CardHeader className="pb-2">
                <h3 className="font-bold text-lg">Hiring Pipeline by Department</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
                  {Array.from(new Set(applications.map(a => a.department))).slice(0, 6).map(dept => {
                    const count = applications.filter(a => a.department === dept).length;
                    return (
                      <div key={dept} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                        <div className="h-10 w-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-blue-600 border border-gray-100">
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{dept || 'Other'}</p>
                          <p className="text-xs text-gray-500">{count} Active Applications</p>
                        </div>
                      </div>
                    );
                  })}
                  {applications.length === 0 && (
                    <div className="col-span-full py-8 text-center text-gray-400 italic">
                      No department data available
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
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
                            <div className="flex flex-col">
                              <span className="font-medium text-gray-900">{application.full_name || 'N/A'}</span>
                              <span className="text-xs text-gray-500">{application.job_title}</span>
                            </div>
                          </div>
                          <Badge variant="outline" className="capitalize text-[10px] px-1.5 py-0 h-5">
                            {application.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(application.created_at)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {application.department}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <Select
                            value={application.status}
                            onValueChange={(value) => handleStatusChange(application.id, value)}
                          >
                            <SelectTrigger className="h-7 w-[110px] text-[10px]">
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
                          
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-gray-600"
                              onClick={() => handleCallApplicant(application.phone, application.full_name)}
                            >
                              <Phone className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-gray-600"
                              onClick={() => handleEmailApplicant(application.email, application.full_name, application.job_title)}
                            >
                              <Mail className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-gray-600"
                              onClick={() => handleViewApplication(application)}
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-red-600"
                              onClick={() => setDeleteId(application.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination Controls - Added to bottom for all views */}
                  {totalPages > 1 && (
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t border-gray-100 bg-gray-50/30 rounded-b-lg">
                      <div className="text-sm text-gray-500 order-2 sm:order-1">
                        Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredApplications.length)}</span> of <span className="font-semibold text-gray-900">{filteredApplications.length}</span> applications
                      </div>
                      <div className="flex items-center gap-1 order-1 sm:order-2">
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
                              className={`h-8 min-w-[32px] p-0 transition-all ${
                                currentPage === page 
                                  ? 'bg-primary text-white hover:bg-primary/90 shadow-sm' 
                                  : 'text-gray-600 hover:text-primary hover:border-primary'
                              }`}
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
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Bulk Delete Alert Dialog */}
        <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {selectedApplications.length} selected job applications. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleBulkDelete} className="bg-red-600 hover:bg-red-700">
                Delete All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Single Application Alert Dialog */}
        <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the job application.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteId && handleDelete(deleteId)} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* View Application Details Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Application Details</DialogTitle>
              <DialogDescription>
                Reviewing application for {selectedApplication?.job_title}
              </DialogDescription>
            </DialogHeader>
            
            {selectedApplication && (
              <div className="space-y-6 py-4">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Applicant Name</label>
                      <p className="text-base font-semibold">{selectedApplication.full_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email Address</label>
                      <p className="text-base">{selectedApplication.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Phone Number</label>
                      <p className="text-base">{selectedApplication.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Position Applied</label>
                      <p className="text-base font-semibold text-primary">{selectedApplication.job_title}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Department</label>
                      <p className="text-base">{selectedApplication.department}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Experience</label>
                      <p className="text-base">{selectedApplication.years_of_experience} years</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Current Company</label>
                      <p className="text-base">{selectedApplication.current_company || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Current Role</label>
                      <p className="text-base">{selectedApplication.current_role || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Notice Period</label>
                      <p className="text-base">{selectedApplication.notice_period}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Expected Salary</label>
                      <p className="text-base">{selectedApplication.expected_salary || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  {selectedApplication.linkedin_url && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(selectedApplication.linkedin_url, '_blank')}
                    >
                      <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn Profile
                    </Button>
                  )}
                  {selectedApplication.portfolio_url && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(selectedApplication.portfolio_url, '_blank')}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Portfolio
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 border-blue-200"
                    onClick={() => handleDownloadResume(selectedApplication.id, selectedApplication.full_name)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Resume
                  </Button>
                </div>

                {/* Cover Letter */}
                {selectedApplication.cover_letter && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">Cover Letter</label>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-sm whitespace-pre-wrap leading-relaxed">
                      {selectedApplication.cover_letter}
                    </div>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setViewDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => handleEmailApplicant(selectedApplication.email, selectedApplication.full_name, selectedApplication.job_title)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email Applicant
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
