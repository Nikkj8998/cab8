import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  MapPin, 
  Briefcase, 
  Loader2, 
  Clock, 
  Search,
  Calendar,
  Building2,
  RefreshCw,
  Filter,
  CheckSquare,
  Square,
  Save,
  X,
  AlignLeft,
  ListChecks,
  Activity,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  TrendingUp,
  BriefcaseBusiness
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const JobsDashboard = ({ jobs }: { jobs: Job[] }) => {
  const activeJobs = jobs.filter(j => j.status === 'active').length;
  const totalJobs = jobs.length;
  const locations = new Set(jobs.map(j => j.location)).size;
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-none shadow-sm ring-1 ring-gray-200 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Postings</p>
              <h3 className="text-2xl font-bold">{totalJobs}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-none shadow-sm ring-1 ring-gray-200 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-lg">
              <Activity className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Jobs</p>
              <h3 className="text-2xl font-bold">{activeJobs}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-none shadow-sm ring-1 ring-gray-200 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Locations</p>
              <h3 className="text-2xl font-bold">{locations}</h3>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-none shadow-sm ring-1 ring-gray-200 bg-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Growth</p>
              <h3 className="text-2xl font-bold">+12%</h3>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm ring-1 ring-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <BriefcaseBusiness className="h-5 w-5 text-blue-600" />
              Executive Overview
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {jobs.slice(0, 3).map(job => (
              <div key={job.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    {job.title[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{job.title}</h4>
                    <p className="text-sm text-gray-500">{job.location}</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-700 border-none px-3 py-1">View Details</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="border-none shadow-sm ring-1 ring-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-600" />
              Professional Talent Pool
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 font-medium">Recent Activity</p>
                  <h4 className="text-3xl font-bold text-gray-900">142</h4>
                  <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> +24% from last month
                  </p>
                </div>
                <div className="flex gap-1 h-20 items-end">
                  {[40, 60, 45, 70, 55, 80, 65].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="w-2 bg-emerald-200 rounded-t-sm" />
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-xs text-gray-500">Avg. Time to Hire</p>
                    <p className="font-bold text-gray-900 text-lg">12 Days</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-xs text-gray-500">Applications</p>
                    <p className="font-bold text-gray-900 text-lg">850+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  experience?: string;
  salary?: string;
  department?: string;
  description: string;
  requirements?: string;
  responsibilities?: string;
  status: string;
  created_at: string;
}

export const JobsList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedJobs, setSelectedJobs] = useState<number[]>([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal State
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await api.jobs.getAll();
      if (response.success && response.data) {
        setJobs(response.data);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await api.jobs.delete(id);
      if (response.success) {
        toast.success('Job deleted successfully');
        fetchJobs();
      } else {
        toast.error(response.message || 'Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
    } finally {
      setDeleteId(null);
    }
  };

  const handleBulkDelete = async () => {
    try {
      const deletePromises = selectedJobs.map(id => api.jobs.delete(id));
      await Promise.all(deletePromises);
      toast.success(`Deleted ${selectedJobs.length} jobs successfully`);
      setSelectedJobs([]);
      setBulkDeleteDialogOpen(false);
      fetchJobs();
    } catch (error) {
      toast.error('Failed to delete some jobs');
    }
  };

  const handleEditClick = (job: Job) => {
    setEditingJob({ ...job });
    setEditDialogOpen(true);
  };

  const handleCreateClick = () => {
    setEditingJob({
      id: 0,
      title: '',
      location: '',
      type: 'Full-time',
      experience: '',
      salary: '',
      department: '',
      description: '',
      requirements: '',
      responsibilities: '',
      status: 'active',
      created_at: new Date().toISOString()
    });
    setEditDialogOpen(true);
  };

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;

    if (!editingJob.title || !editingJob.location || !editingJob.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      let response;
      if (editingJob.id === 0) {
        response = await api.jobs.create(editingJob);
      } else {
        response = await api.jobs.update(editingJob.id, editingJob);
      }

      if (response.success) {
        toast.success(editingJob.id === 0 ? 'Job created successfully' : 'Job updated successfully');
        setEditDialogOpen(false);
        fetchJobs();
      } else {
        toast.error(response.message || 'Failed to save job');
      }
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error('An error occurred while saving');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof Job, value: string) => {
    if (!editingJob) return;
    setEditingJob(prev => prev ? ({ ...prev, [field]: value }) : null);
  };

  const toggleSelectJob = (id: number) => {
    setSelectedJobs(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(filteredJobs.map(j => j.id));
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-gray-500 font-medium">Loading career opportunities...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 p-4 sm:p-6 space-y-6 max-w-full overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Career Management</h1>
            <p className="text-gray-500">Post and manage job opportunities for your team</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={fetchJobs}
              className="flex-1 sm:flex-none"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={handleCreateClick} className="flex-1 sm:flex-none">
              <Plus className="h-4 w-4 mr-2" />
              Post Job
            </Button>
          </div>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="bg-gray-100/50 p-1 mb-4">
            <TabsTrigger value="list" className="gap-2">
              <ListChecks className="h-4 w-4" />
              Job List
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="m-0 border-none p-0">
            <Card className="border-none shadow-sm ring-1 ring-gray-200">
          <CardHeader className="pb-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search jobs by title or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-10 bg-gray-50/50 border-gray-200 focus:bg-white transition-all"
                  />
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Filter className="h-4 w-4 text-gray-400" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px] h-10">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                {selectedJobs.length > 0 && (
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => setBulkDeleteDialogOpen(true)}
                    className="h-10 px-4"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete ({selectedJobs.length})
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop View Table */}
            <div className="hidden md:block overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="w-[40px] pl-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSelectAll}
                        className="h-8 w-8 text-gray-400 hover:text-primary"
                      >
                        {selectedJobs.length === filteredJobs.length && filteredJobs.length > 0 ? (
                          <CheckSquare className="h-4 w-4 text-primary" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">Position</TableHead>
                    <TableHead className="font-semibold text-gray-900">Location</TableHead>
                    <TableHead className="font-semibold text-gray-900">Type</TableHead>
                    <TableHead className="font-semibold text-gray-900">Experience</TableHead>
                    <TableHead className="font-semibold text-gray-900">Status</TableHead>
                    <TableHead className="font-semibold text-gray-900">Posted Date</TableHead>
                    <TableHead className="text-right pr-6 font-semibold text-gray-900">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedJobs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-32 text-center text-gray-500">
                        {searchTerm || statusFilter !== 'all' ? "No jobs match your filters." : "No job postings found."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedJobs.map((job) => (
                      <TableRow 
                        key={job.id} 
                        className={`hover:bg-gray-50/50 transition-colors ${selectedJobs.includes(job.id) ? 'bg-blue-50/30' : ''}`}
                      >
                        <TableCell className="pl-6">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleSelectJob(job.id)}
                            className={`h-8 w-8 ${selectedJobs.includes(job.id) ? 'text-primary' : 'text-gray-300'}`}
                          >
                            {selectedJobs.includes(job.id) ? (
                              <CheckSquare className="h-4 w-4" />
                            ) : (
                              <Square className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900">{job.title}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <Building2 className="h-3 w-3" />
                            {job.department || 'Not specified'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <MapPin className="h-3.5 w-3.5 text-gray-400" />
                            {job.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium bg-gray-50 text-gray-600 border-gray-200">
                            {job.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {job.experience || '-'}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={`${
                              job.status === 'active' 
                                ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                                : 'bg-gray-100 text-gray-700 border-gray-200'
                            } text-[10px] font-bold uppercase tracking-wider`}
                          >
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(job.created_at).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              onClick={() => handleEditClick(job)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => setDeleteId(job.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50/30 border-t border-gray-100">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredJobs.length)}</span> of <span className="font-medium">{filteredJobs.length}</span> results
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
              {paginatedJobs.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  {searchTerm || statusFilter !== 'all' ? "No jobs match your filters." : "No job postings found."}
                </div>
              ) : (
                paginatedJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className={`p-4 space-y-3 transition-colors ${selectedJobs.includes(job.id) ? 'bg-blue-50/30' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleSelectJob(job.id)}
                          className={`h-8 w-8 mt-1 ${selectedJobs.includes(job.id) ? 'text-primary' : 'text-gray-300'}`}
                        >
                          {selectedJobs.includes(job.id) ? (
                            <CheckSquare className="h-4 w-4" />
                          ) : (
                            <Square className="h-4 w-4" />
                          )}
                        </Button>
                        <div>
                          <h3 className="font-bold text-gray-900">{job.title}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">{job.department || 'General'}</p>
                        </div>
                      </div>
                      <Badge 
                        className={`${
                          job.status === 'active' 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-gray-100 text-gray-700'
                        } text-[10px] font-bold uppercase`}
                      >
                        {job.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm ml-11">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <MapPin className="h-3.5 w-3.5 text-gray-400" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Briefcase className="h-3.5 w-3.5 text-gray-400" />
                        <span className="truncate">{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Building2 className="h-3.5 w-3.5 text-gray-400" />
                        <span className="truncate">{job.experience || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        <span>{new Date(job.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-gray-50">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 text-blue-600 border-blue-100 hover:bg-blue-50"
                        onClick={() => handleEditClick(job)}
                      >
                        <Pencil className="h-3.5 w-3.5 mr-1.5" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 text-red-600 border-red-100 hover:bg-red-50"
                        onClick={() => setDeleteId(job.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="dashboard" className="m-0 border-none p-0">
        <JobsDashboard jobs={jobs} />
      </TabsContent>
    </Tabs>
  </div>

  <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-[95vw] sm:w-full p-0 sm:p-6 overflow-x-hidden">
          <div className="p-4 sm:p-0">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Briefcase className="h-6 w-6 text-blue-600" />
                {editingJob?.id === 0 ? 'Post New Opening' : 'Edit Job Posting'}
              </DialogTitle>
            </DialogHeader>
            
            {editingJob && (
              <form onSubmit={handleSaveJob} className="space-y-6 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700">Job Title *</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="e.g., Senior Developer"
                          value={editingJob.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Location *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="e.g., Remote"
                            value={editingJob.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Job Type</Label>
                        <Select value={editingJob.type} onValueChange={(v) => handleInputChange('type', v)}>
                          <SelectTrigger>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <SelectValue />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Department</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Engineering"
                            value={editingJob.department || ''}
                            onChange={(e) => handleInputChange('department', e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Experience</Label>
                        <Input
                          placeholder="3-5 years"
                          value={editingJob.experience || ''}
                          onChange={(e) => handleInputChange('experience', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Compensation</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="₹12 - ₹18 LPA"
                            value={editingJob.salary || ''}
                            onChange={(e) => handleInputChange('salary', e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Visibility Status</Label>
                        <Select value={editingJob.status} onValueChange={(v) => handleInputChange('status', v)}>
                          <SelectTrigger>
                            <div className="flex items-center gap-2">
                              <Activity className="h-4 w-4 text-gray-400" />
                              <SelectValue />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active (Visible)</SelectItem>
                            <SelectItem value="inactive">Inactive (Hidden)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700">Job Description *</Label>
                      <Textarea
                        placeholder="Brief overview..."
                        value={editingJob.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        className="min-h-[100px] sm:min-h-[120px]"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <ListChecks className="h-4 w-4 text-blue-600" />
                        Responsibilities
                      </Label>
                      <Textarea
                        placeholder="• List key responsibilities..."
                        value={editingJob.responsibilities || ''}
                        onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                        className="min-h-[80px] sm:min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <AlignLeft className="h-4 w-4 text-blue-600" />
                        Requirements
                      </Label>
                      <Textarea
                        placeholder="• List qualifications..."
                        value={editingJob.requirements || ''}
                        onChange={(e) => handleInputChange('requirements', e.target.value)}
                        className="min-h-[80px] sm:min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
                  <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)} className="w-full sm:w-auto">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    {editingJob.id === 0 ? 'Create Job' : 'Update Job'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialogs */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this job posting. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteId && handleDelete(deleteId)}
            >
              Delete Job
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Multiple Jobs</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedJobs.length} selected job postings? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleBulkDelete}
            >
              Delete Selected
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};