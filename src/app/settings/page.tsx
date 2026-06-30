'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, Shield, Database, Puzzle, Users, Save,
  Eye, EyeOff, Key, Smartphone, Globe, Clock, DollarSign,
  Mail, Phone, MapPin, Building, Trash2, AlertTriangle,
  CheckCircle, X, Copy, Download, Upload, RefreshCw,
  LogOut, UserPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, type Tab } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert } from '@/components/ui/alert';
import { AnimatedSection } from '@/lib/animation';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'invited' | 'disabled';
  avatar: string;
}

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  color: string;
}

const teamMembers: TeamMember[] = [
  { id: 't1', name: 'Adv. Rajesh Sharma', email: 'rajesh@legacylegal.in', role: 'Admin', status: 'active', avatar: 'RS' },
  { id: 't2', name: 'Adv. Priya Patel', email: 'priya@legacylegal.in', role: 'Partner', status: 'active', avatar: 'PP' },
  { id: 't3', name: 'Adv. Arun Krishnan', email: 'arun@legacylegal.in', role: 'Partner', status: 'active', avatar: 'AK' },
  { id: 't4', name: 'Neha Gupta', email: 'neha@legacylegal.in', role: 'Paralegal', status: 'active', avatar: 'NG' },
  { id: 't5', name: 'Vikram Joshi', email: 'vikram@legacylegal.in', role: 'Associate', status: 'invited', avatar: 'VJ' },
];

const integrations: Integration[] = [
  { id: 'stripe', name: 'Stripe', description: 'Payment processing for invoices', icon: <DollarSign className="w-5 h-5" />, connected: true, color: 'bg-purple-50 text-purple-600' },
  { id: 'razorpay', name: 'Razorpay', description: 'Indian payment gateway', icon: <DollarSign className="w-5 h-5" />, connected: true, color: 'bg-blue-50 text-blue-600' },
  { id: 'google-cal', name: 'Google Calendar', description: 'Sync appointments and hearings', icon: <Globe className="w-5 h-5" />, connected: true, color: 'bg-green-50 text-green-600' },
  { id: 'zoom', name: 'Zoom', description: 'Video consultations and meetings', icon: <Globe className="w-5 h-5" />, connected: false, color: 'bg-cyan-50 text-cyan-600' },
  { id: 'whatsapp', name: 'WhatsApp Business', description: 'Client communication and updates', icon: <Smartphone className="w-5 h-5" />, connected: false, color: 'bg-emerald-50 text-emerald-600' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [saved, setSaved] = useState(false);
  const [sessionExpiry, setSessionExpiry] = useState('24');
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('weekly');
  const [firmName, setFirmName] = useState('Legacy Legal Partners');
  const [firmAddress, setFirmAddress] = useState('No. 42, Kasturba Road, MG Road, Bengaluru, Karnataka 560001');
  const [firmPhone, setFirmPhone] = useState('+91 1800 123 4567');
  const [firmEmail, setFirmEmail] = useState('contact@legacylegal.in');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [currency, setCurrency] = useState('INR');

  const tabs: Tab[] = [
    { id: 'general', label: 'General', icon: <Settings className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'data', label: 'Data & Backup', icon: <Database className="w-4 h-4" /> },
    { id: 'integrations', label: 'Integrations', icon: <Puzzle className="w-4 h-4" /> },
    { id: 'team', label: 'Team', icon: <Users className="w-4 h-4" /> },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-surface-900 font-serif">Settings</h1>
              <p className="text-surface-500 mt-1">Manage your firm profile, security, and preferences</p>
            </div>
            <Button variant="primary" size="lg" onClick={handleSave}>
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="pills" />
        </AnimatedSection>

        <AnimatePresence mode="wait">
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Alert variant="success" title="Settings saved" message="Your changes have been updated successfully." dismissible />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatedSection key={activeTab}>
          {activeTab === 'general' && (
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your firm&apos;s basic information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Firm Name" value={firmName} onChange={(e) => setFirmName(e.target.value)} leftIcon={<Building className="w-4 h-4" />} />
                    <Input label="Email" type="email" value={firmEmail} onChange={(e) => setFirmEmail(e.target.value)} leftIcon={<Mail className="w-4 h-4" />} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Phone" type="tel" value={firmPhone} onChange={(e) => setFirmPhone(e.target.value)} leftIcon={<Phone className="w-4 h-4" />} />
                    <div>
                      <p className="text-sm font-medium text-surface-700 mb-1.5">Timezone</p>
                      <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full h-10 px-4 text-sm rounded-lg border border-surface-200 bg-white text-surface-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none">
                        <option>Asia/Kolkata</option>
                        <option>Asia/Dubai</option>
                        <option>Asia/Singapore</option>
                        <option>America/New_York</option>
                        <option>Europe/London</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1.5">Address</label>
                    <textarea
                      value={firmAddress}
                      onChange={(e) => setFirmAddress(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2.5 text-sm rounded-lg border border-surface-200 bg-white text-surface-900 placeholder:text-surface-400 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <p className="text-sm font-medium text-surface-700 mb-1.5">Currency</p>
                      <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full h-10 px-4 text-sm rounded-lg border border-surface-200 bg-white text-surface-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none">
                        <option>INR (₹)</option>
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>AED (د.إ)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password & Authentication</CardTitle>
                  <CardDescription>Update your password and security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input
                      label="Current Password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter current password"
                      rightIcon={<button onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>}
                    />
                    <Input
                      label="New Password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter new password"
                    />
                  </div>
                  <Input
                    label="Confirm New Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                  />
                  <Button variant="primary" size="md">
                    <Key className="w-4 h-4" /> Update Password
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <Smartphone className="w-5 h-5 text-surface-400 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-surface-900">Authenticator App</p>
                        <p className="text-xs text-surface-500">Use Google Authenticator or Authy to get verification codes</p>
                      </div>
                    </div>
                    <Switch checked={mfaEnabled} onChange={setMfaEnabled} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Session Management</CardTitle>
                  <CardDescription>Manage active sessions and sign-out preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-50">
                    <div>
                      <p className="text-sm font-medium text-surface-900">Current Session</p>
                      <p className="text-xs text-surface-500">Chrome on Windows &middot; Started 2 hours ago</p>
                    </div>
                    <Badge variant="success" size="sm">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-surface-900">Session Expiry</p>
                      <p className="text-xs text-surface-500">Auto-logout after inactivity</p>
                    </div>
                    <select value={sessionExpiry} onChange={(e) => setSessionExpiry(e.target.value)} className="px-3 py-1.5 text-sm rounded-lg border border-surface-200 bg-white text-surface-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none">
                      <option value="1">1 hour</option>
                      <option value="4">4 hours</option>
                      <option value="24">24 hours</option>
                      <option value="72">3 days</option>
                      <option value="168">7 days</option>
                    </select>
                  </div>
                  <Button variant="danger" size="sm">
                    <LogOut className="w-4 h-4" /> Sign Out All Devices
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'data' && (
            <Card>
              <CardHeader>
                <CardTitle>Data & Backup</CardTitle>
                <CardDescription>Manage your data, exports, and backup preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-surface-50 border border-surface-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                        <Download className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-surface-900">Export All Data</p>
                        <p className="text-xs text-surface-500">Download your complete data archive</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Export Now</Button>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-50 border border-surface-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-success-100 flex items-center justify-center">
                        <Upload className="w-5 h-5 text-success-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-surface-900">Import Data</p>
                        <p className="text-xs text-surface-500">Import cases, clients, and documents</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Import</Button>
                  </div>
                </div>

                <div className="border-t border-surface-100 pt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-surface-900">Automatic Backup</p>
                      <p className="text-xs text-surface-500">Scheduled backups of your entire data</p>
                    </div>
                    <Switch checked={autoBackup} onChange={setAutoBackup} />
                  </div>
                  {autoBackup && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-surface-600">Backup Frequency</p>
                      <select value={backupFrequency} onChange={(e) => setBackupFrequency(e.target.value)} className="px-3 py-1.5 text-sm rounded-lg border border-surface-200 bg-white text-surface-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  )}
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 text-amber-700 text-sm">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Last backup: 2 hours ago. Next backup scheduled for tomorrow 2:00 AM IST.</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4" /> Restore from Backup
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'integrations' && (
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Connect your favorite tools and services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {integrations.map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-50 border border-surface-100 hover:border-surface-200 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', integration.color)}>
                          {integration.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-surface-900">{integration.name}</p>
                          <p className="text-xs text-surface-500">{integration.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {integration.connected ? (
                          <Badge variant="success" size="sm">Connected</Badge>
                        ) : (
                          <Badge variant="default" size="sm">Not Connected</Badge>
                        )}
                        <Button variant={integration.connected ? 'outline' : 'primary'} size="sm">
                          {integration.connected ? 'Disconnect' : 'Connect'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'team' && (
            <Card>
              <CardHeader
                action={
                  <Button variant="primary" size="sm">
                    <UserPlus className="w-4 h-4" /> Invite Member
                  </Button>
                }
              >
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage your firm&apos;s team and their roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 rounded-xl bg-white border border-surface-100 hover:shadow-soft transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-surface-900">{member.name}</p>
                          <p className="text-xs text-surface-500">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={member.status === 'active' ? 'success' : member.status === 'invited' ? 'warning' : 'default'} size="sm">
                          {member.status}
                        </Badge>
                        <select defaultValue={member.role} className="px-3 py-1.5 text-xs rounded-lg border border-surface-200 bg-white text-surface-700 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none">
                          <option>Admin</option>
                          <option>Partner</option>
                          <option>Associate</option>
                          <option>Paralegal</option>
                          <option>Staff</option>
                        </select>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-danger-400" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </AnimatedSection>
      </div>
    </div>
  );
}
