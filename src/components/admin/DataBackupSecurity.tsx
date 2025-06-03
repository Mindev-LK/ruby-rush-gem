
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Shield,
  Database,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  Eye,
  Lock,
  Users,
  Activity
} from "lucide-react";

export const DataBackupSecurity = () => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const securityLogs = [
    { id: 1, timestamp: "2024-01-15 14:30:22", user: "admin", action: "Login", ip: "192.168.1.100", status: "Success" },
    { id: 2, timestamp: "2024-01-15 14:25:10", user: "john.doe", action: "Password Change", ip: "192.168.1.105", status: "Success" },
    { id: 3, timestamp: "2024-01-15 14:20:55", user: "unknown", action: "Failed Login", ip: "203.94.15.22", status: "Failed" },
    { id: 4, timestamp: "2024-01-15 14:15:33", user: "jane.smith", action: "Data Export", ip: "192.168.1.110", status: "Success" },
    { id: 5, timestamp: "2024-01-15 14:10:18", user: "admin", action: "User Created", ip: "192.168.1.100", status: "Success" }
  ];

  const auditTrail = [
    { id: 1, timestamp: "2024-01-15 14:35:00", module: "Sales", action: "Create Sale", user: "john.doe", record: "SALE-2024-001", details: "New sale created for Ruby gem" },
    { id: 2, timestamp: "2024-01-15 14:30:15", module: "Inventory", action: "Update Gem", user: "jane.smith", record: "GEM-2024-045", details: "Updated gem status to Available" },
    { id: 3, timestamp: "2024-01-15 14:25:30", module: "Accounts", action: "Payment Recorded", user: "admin", record: "PAY-2024-012", details: "Payment received from ABC Buyer" },
    { id: 4, timestamp: "2024-01-15 14:20:45", module: "Users", action: "Role Changed", user: "admin", record: "USER-005", details: "Changed role from Staff to Manager" }
  ];

  const userPermissions = [
    { role: "Super Admin", permissions: ["All Access", "User Management", "System Settings", "Backup Access"] },
    { role: "Operations Staff", permissions: ["Gem Management", "Sales Entry", "Inventory View", "Basic Reports"] },
    { role: "Finance Staff", permissions: ["Financial Reports", "Accounts Management", "Payment Tracking", "Advanced Reports"] }
  ];

  const backupStatus = {
    lastBackup: "2024-01-15 02:00:00",
    nextBackup: "2024-01-16 02:00:00",
    totalBackups: 45,
    totalSize: "12.4 GB",
    status: "Healthy"
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Data Backup & Security</h1>
        <nav className="text-sm text-gray-500 mt-1">
          Dashboard &gt; Administration &gt; Data Backup & Security
        </nav>
      </div>

      <Tabs defaultValue="backup" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="backup">Backup Status</TabsTrigger>
          <TabsTrigger value="security">Security Logs</TabsTrigger>
          <TabsTrigger value="permissions">Access Control</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="backup">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Last Backup</p>
                      <p className="text-2xl font-bold text-gray-900">{backupStatus.lastBackup}</p>
                    </div>
                    <Database className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Next Backup</p>
                      <p className="text-2xl font-bold text-gray-900">{backupStatus.nextBackup}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Backups</p>
                      <p className="text-2xl font-bold text-gray-900">{backupStatus.totalBackups}</p>
                    </div>
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Size</p>
                      <p className="text-2xl font-bold text-gray-900">{backupStatus.totalSize}</p>
                    </div>
                    <Database className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Backup Management
                </CardTitle>
                <CardDescription>
                  Monitor and manage system backups
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Create Manual Backup
                  </Button>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Restore from Backup
                  </Button>
                  <Button variant="outline">
                    Schedule Backup
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4">Recent Backups</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>2024-01-15 02:00:00</TableCell>
                        <TableCell>Automatic</TableCell>
                        <TableCell>285 MB</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Success
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>2024-01-14 02:00:00</TableCell>
                        <TableCell>Automatic</TableCell>
                        <TableCell>283 MB</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Success
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Logs
              </CardTitle>
              <CardDescription>
                Monitor system access and security events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Input placeholder="Search logs..." className="max-w-sm" />
                <Button variant="outline">Filter by Date</Button>
                <Button variant="outline">Export Logs</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {log.status === "Success" ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                          {log.status}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Access Control & Permissions
              </CardTitle>
              <CardDescription>
                Manage user roles and system permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Role-Based Permissions</h4>
                  <Button>
                    <Lock className="w-4 h-4 mr-2" />
                    Create New Role
                  </Button>
                </div>

                <div className="space-y-4">
                  {userPermissions.map((role, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-medium">{role.role}</h5>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((permission, permIndex) => (
                          <span
                            key={permIndex}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t">
                  <h4 className="font-medium mb-4">System Permissions Matrix</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Module</TableHead>
                        <TableHead>Super Admin</TableHead>
                        <TableHead>Operations Staff</TableHead>
                        <TableHead>Finance Staff</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Gem Management</TableCell>
                        <TableCell><CheckCircle className="w-4 h-4 text-green-500" /></TableCell>
                        <TableCell><CheckCircle className="w-4 h-4 text-green-500" /></TableCell>
                        <TableCell><AlertCircle className="w-4 h-4 text-red-500" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Financial Reports</TableCell>
                        <TableCell><CheckCircle className="w-4 h-4 text-green-500" /></TableCell>
                        <TableCell><AlertCircle className="w-4 h-4 text-red-500" /></TableCell>
                        <TableCell><CheckCircle className="w-4 h-4 text-green-500" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>User Management</TableCell>
                        <TableCell><CheckCircle className="w-4 h-4 text-green-500" /></TableCell>
                        <TableCell><AlertCircle className="w-4 h-4 text-red-500" /></TableCell>
                        <TableCell><AlertCircle className="w-4 h-4 text-red-500" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>System Settings</TableCell>
                        <TableCell><CheckCircle className="w-4 h-4 text-green-500" /></TableCell>
                        <TableCell><AlertCircle className="w-4 h-4 text-red-500" /></TableCell>
                        <TableCell><AlertCircle className="w-4 h-4 text-red-500" /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                System Audit Trail
              </CardTitle>
              <CardDescription>
                Track all system activities and data changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Input placeholder="Search audit trail..." className="max-w-sm" />
                <Button variant="outline">Filter by Module</Button>
                <Button variant="outline">Filter by User</Button>
                <Button variant="outline">Export Trail</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Module</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Record ID</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditTrail.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.timestamp}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                          {entry.module}
                        </span>
                      </TableCell>
                      <TableCell>{entry.action}</TableCell>
                      <TableCell>{entry.user}</TableCell>
                      <TableCell className="font-mono text-sm">{entry.record}</TableCell>
                      <TableCell className="max-w-xs truncate">{entry.details}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
