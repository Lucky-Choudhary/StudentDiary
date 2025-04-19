"use client";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { formSchemaType } from "./user-dashboard";
import { Search, Users, Loader2, Check, X, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminDashboardTable() {
  const [userArray, setUserArray] = useState<formSchemaType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [userStates, setUserStates] = useState<Record<string, 'normal' | 'accepted' | 'rejected' | 'deleted'>>({});

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/admin_dashboard");
        setUserArray(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  const handleAction = (action: 'accept' | 'reject' | 'delete', userId: string) => {
    setUserStates(prev => ({
      ...prev,
      [userId]: action === 'accept' ? 'accepted' : action === 'reject' ? 'rejected' : 'deleted'
    }));
  };

  const filteredUsers = userArray.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      userStates[user.college_roll_no] !== 'deleted' && 
      (user.firstname.toLowerCase().includes(searchLower) ||
      user.lastname.toLowerCase().includes(searchLower) ||
      user.college_roll_no.toLowerCase().includes(searchLower) ||
      user.university_roll_no.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower))
    );
  });

  const getRowTextColor = (status?: 'normal' | 'accepted' | 'rejected' | 'deleted') => {
    switch (status) {
      case 'accepted':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      default:
        return 'text-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-black min-h-screen">
      {/* Header Section with updated colors */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/10">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Student Records</h1>
            <p className="text-sm text-gray-400">
              Manage and view all student information
            </p>
          </div>
        </div>
        
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full md:w-[300px] bg-white/5 border-white/10 focus:border-white/20 text-white placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Table Section with dark theme */}
      <div className="rounded-lg border border-white/10 bg-black/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-white/5">
              <TableHead className="w-[120px] text-gray-400 font-semibold">First Name</TableHead>
              <TableHead className="w-[120px] text-gray-400 font-semibold">Last Name</TableHead>
              <TableHead className="text-gray-400 font-semibold">College Roll No.</TableHead>
              <TableHead className="text-gray-400 font-semibold">University Roll No.</TableHead>
              <TableHead className="text-gray-400 font-semibold">Branch</TableHead>
              <TableHead className="text-gray-400 font-semibold">Batch</TableHead>
              <TableHead className="text-gray-400 font-semibold">Semester</TableHead>
              <TableHead className="text-gray-400 font-semibold">Email</TableHead>
              <TableHead className="text-gray-400 font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading student records...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center text-gray-400">
                  No students found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow 
                  key={user.college_roll_no}
                  className={`transition-colors hover:bg-white/5 ${
                    userStates[user.college_roll_no] === 'accepted' ? 'bg-green-950/30' :
                    userStates[user.college_roll_no] === 'rejected' ? 'bg-red-950/30' :
                    ''
                  }`}
                >
                  {/* All cells with updated text colors */}
                  {[
                    user.firstname,
                    user.lastname,
                    user.college_roll_no,
                    user.university_roll_no,
                    user.branch,
                    user.batch,
                    user.semester,
                    user.email
                  ].map((value, index) => (
                    <TableCell 
                      key={index}
                      className={`${
                        userStates[user.college_roll_no] === 'accepted' ? 'text-green-400' :
                        userStates[user.college_roll_no] === 'rejected' ? 'text-red-400' :
                        'text-gray-300'
                      }`}
                    >
                      {value}
                    </TableCell>
                  ))}
                  
                  {/* Actions cell */}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/20"
                        onClick={() => handleAction('accept', user.college_roll_no)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border-orange-500/20"
                        onClick={() => handleAction('reject', user.college_roll_no)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20"
                        onClick={() => handleAction('delete', user.college_roll_no)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer Stats with updated colors */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <Users className="h-4 w-4" />
          <span>{filteredUsers.length} students</span>
        </div>
        {searchQuery && (
          <div className="flex items-center gap-2 text-gray-400">
            <Search className="h-4 w-4" />
            <span>Filtered by: {searchQuery}</span>
          </div>
        )}
      </div>
    </div>
  );
}
