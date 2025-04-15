"use client";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { formSchemaType } from "./user-dashboard";
import { Search, Users, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminDashboardTable() {
  const [userArray, setUserArray] = useState<formSchemaType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredUsers = userArray.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.firstname.toLowerCase().includes(searchLower) ||
      user.lastname.toLowerCase().includes(searchLower) ||
      user.college_roll_no.toLowerCase().includes(searchLower) ||
      user.university_roll_no.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-black">Student Records</h1>
            <p className="text-sm text-muted-foreground">
              Manage and view all student information
            </p>
          </div>
        </div>
        
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full md:w-[300px] bg-background/50 border-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-lg border border-primary/20 bg-card/50 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[120px] text-primary font-semibold">First Name</TableHead>
              <TableHead className="w-[120px] text-primary font-semibold">Last Name</TableHead>
              <TableHead className="text-primary font-semibold">College Roll No.</TableHead>
              <TableHead className="text-primary font-semibold">University Roll No.</TableHead>
              <TableHead className="text-primary font-semibold">Branch</TableHead>
              <TableHead className="text-primary font-semibold">Batch</TableHead>
              <TableHead className="text-primary font-semibold">Semester</TableHead>
              <TableHead className="text-primary font-semibold">Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading student records...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-primary">
                  No students found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow 
                  key={user.college_roll_no}
                  className="transition-colors hover:bg-primary/5"
                >
                  <TableCell className="font-medium text-foreground">{user.firstname}</TableCell>
                  <TableCell className="font-medium text-foreground">{user.lastname}</TableCell>
                  <TableCell className="text-foreground">{user.college_roll_no}</TableCell>
                  <TableCell className="text-foreground">{user.university_roll_no}</TableCell>
                  <TableCell className="text-foreground">{user.branch}</TableCell>
                  <TableCell className="text-foreground">{user.batch}</TableCell>
                  <TableCell className="text-foreground">{user.semester}</TableCell>
                  <TableCell className="text-primary/80">{user.email}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer Stats */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2 text-primary">
          <Users className="h-4 w-4" />
          <span>{filteredUsers.length} students</span>
        </div>
        {searchQuery && (
          <div className="flex items-center gap-2 text-primary/80">
            <Search className="h-4 w-4" />
            <span>Filtered by: {searchQuery}</span>
          </div>
        )}
      </div>
    </div>
  );
}
