"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useAuth } from "@/app/contexts/AuthContext";
import { 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    Palette, 
    Bell, 
    Shield, 
    CreditCard, 
    Globe, 
    Volume2,
    Save,
    Check,
    X,
    Eye,
    EyeOff,
    Camera,
    Upload
} from "lucide-react";

export default function SettingsPage() {
    const { user, logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const [activeTab, setActiveTab] = useState("profile");
    const [savedMessage, setSavedMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Profile Settings State
    const [profileData, setProfileData] = useState({
        firstName: user?.name?.split(' ')[0] || "",
        lastName: user?.name?.split(' ')[1] || "",
        email: user?.email || "",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, New York, NY 10001",
        dateOfBirth: "1990-01-15",
        bio: "Passionate traveler and car enthusiast. Love exploring new places and experiencing different cultures."
    });

    // Notification Settings State
    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        marketingEmails: false,
        bookingReminders: true,
        paymentAlerts: true,
        promotionalOffers: false,
        newsletter: true
    });

    // Privacy Settings State
    const [privacySettings, setPrivacySettings] = useState({
        profileVisibility: "public",
        showRentalHistory: true,
        allowReviews: true,
        twoFactorAuth: false,
        dataSharing: false,
        locationTracking: false,
        analyticsTracking: true
    });

    // Appearance Settings State
    const [appearanceSettings, setAppearanceSettings] = useState({
        theme: theme || "dark",
        language: "en",
        fontSize: "medium",
        sidebarCollapsed: false,
        animationsEnabled: true,
        highContrast: false
    });

    // Password State
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        showCurrentPassword: false,
        showNewPassword: false,
        showConfirmPassword: false
    });

    useEffect(() => {
        setTheme(appearanceSettings.theme);
    }, [appearanceSettings.theme, setTheme]);

    const handleSaveProfile = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSavedMessage("Profile updated successfully!");
        setTimeout(() => setSavedMessage(""), 3000);
        setIsLoading(false);
    };

    const handleSaveNotifications = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSavedMessage("Notification preferences updated!");
        setTimeout(() => setSavedMessage(""), 3000);
        setIsLoading(false);
    };

    const handleSavePrivacy = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSavedMessage("Privacy settings updated!");
        setTimeout(() => setSavedMessage(""), 3000);
        setIsLoading(false);
    };

    const handleSaveAppearance = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSavedMessage("Appearance settings updated!");
        setTimeout(() => setSavedMessage(""), 3000);
        setIsLoading(false);
    };

    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setSavedMessage("Passwords do not match!");
            setTimeout(() => setSavedMessage(""), 3000);
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSavedMessage("Password changed successfully!");
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            showCurrentPassword: false,
            showNewPassword: false,
            showConfirmPassword: false
        });
        setTimeout(() => setSavedMessage(""), 3000);
        setIsLoading(false);
    };

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "privacy", label: "Privacy", icon: Shield },
        { id: "appearance", label: "Appearance", icon: Palette },
        { id: "security", label: "Security", icon: Shield }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black pt-28">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/profile" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
                        ← Back to Profile
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
                    <p className="text-gray-400">Manage your account settings and preferences</p>
                </div>

                {/* Success Message */}
                {savedMessage && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                        savedMessage.includes("success") 
                            ? "bg-green-900/20 border border-green-800 text-green-400"
                            : "bg-red-900/20 border border-red-800 text-red-400"
                    }`}>
                        {savedMessage.includes("success") ? <Check size={20} /> : <X size={20} />}
                        {savedMessage}
                    </div>
                )}

                {/* Navigation Tabs */}
                <div className="flex gap-2 mb-8 border-b border-gray-800">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-t-xl transition-colors ${
                                activeTab === tab.id
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                            }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                    {/* Profile Settings */}
                    {activeTab === "profile" && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white mb-4">Profile Information</h3>
                            
                            {/* Profile Picture */}
                            <div className="flex items-center gap-6 mb-6">
                                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
                                    <User size={40} className="text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Profile Picture</h4>
                                    <div className="flex gap-3">
                                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2">
                                            <Camera size={16} />
                                            Change Photo
                                        </button>
                                        <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Information */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        value={profileData.firstName}
                                        onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        value={profileData.lastName}
                                        onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        value={profileData.phone}
                                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                                    <input
                                        type="text"
                                        value={profileData.address}
                                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
                                    <input
                                        type="date"
                                        value={profileData.dateOfBirth}
                                        onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                                <textarea
                                    value={profileData.bio}
                                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                                    rows={4}
                                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                />
                            </div>

                            <button
                                onClick={handleSaveProfile}
                                disabled={isLoading}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Save size={16} />
                                {isLoading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    )}

                    {/* Notification Settings */}
                    {activeTab === "notifications" && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white mb-4">Notification Preferences</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-white">Email Notifications</h4>
                                        <p className="text-sm text-gray-400">Receive notifications via email</p>
                                    </div>
                                    <button
                                        onClick={() => setNotificationSettings({...notificationSettings, emailNotifications: !notificationSettings.emailNotifications})}
                                        className={`w-12 h-6 rounded-full transition-colors ${
                                            notificationSettings.emailNotifications ? "bg-blue-600" : "bg-gray-600"
                                        }`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                            notificationSettings.emailNotifications ? "translate-x-6" : "translate-x-0.5"
                                        }`} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-white">SMS Notifications</h4>
                                        <p className="text-sm text-gray-400">Receive text message alerts</p>
                                    </div>
                                    <button
                                        onClick={() => setNotificationSettings({...notificationSettings, smsNotifications: !notificationSettings.smsNotifications})}
                                        className={`w-12 h-6 rounded-full transition-colors ${
                                            notificationSettings.smsNotifications ? "bg-blue-600" : "bg-gray-600"
                                        }`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                            notificationSettings.smsNotifications ? "translate-x-6" : "translate-x-0.5"
                                        }`} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-white">Push Notifications</h4>
                                        <p className="text-sm text-gray-400">Browser push notifications</p>
                                    </div>
                                    <button
                                        onClick={() => setNotificationSettings({...notificationSettings, pushNotifications: !notificationSettings.pushNotifications})}
                                        className={`w-12 h-6 rounded-full transition-colors ${
                                            notificationSettings.pushNotifications ? "bg-blue-600" : "bg-gray-600"
                                        }`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                            notificationSettings.pushNotifications ? "translate-x-6" : "translate-x-0.5"
                                        }`} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-white">Booking Reminders</h4>
                                        <p className="text-sm text-gray-400">Reminders before your rental</p>
                                    </div>
                                    <button
                                        onClick={() => setNotificationSettings({...notificationSettings, bookingReminders: !notificationSettings.bookingReminders})}
                                        className={`w-12 h-6 rounded-full transition-colors ${
                                            notificationSettings.bookingReminders ? "bg-blue-600" : "bg-gray-600"
                                        }`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                            notificationSettings.bookingReminders ? "translate-x-6" : "translate-x-0.5"
                                        }`} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-white">Payment Alerts</h4>
                                        <p className="text-sm text-gray-400">Payment and billing notifications</p>
                                    </div>
                                    <button
                                        onClick={() => setNotificationSettings({...notificationSettings, paymentAlerts: !notificationSettings.paymentAlerts})}
                                        className={`w-12 h-6 rounded-full transition-colors ${
                                            notificationSettings.paymentAlerts ? "bg-blue-600" : "bg-gray-600"
                                        }`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                            notificationSettings.paymentAlerts ? "translate-x-6" : "translate-x-0.5"
                                        }`} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-white">Marketing Emails</h4>
                                        <p className="text-sm text-gray-400">Promotional offers and updates</p>
                                    </div>
                                    <button
                                        onClick={() => setNotificationSettings({...notificationSettings, marketingEmails: !notificationSettings.marketingEmails})}
                                        className={`w-12 h-6 rounded-full transition-colors ${
                                            notificationSettings.marketingEmails ? "bg-blue-600" : "bg-gray-600"
                                        }`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                            notificationSettings.marketingEmails ? "translate-x-6" : "translate-x-0.5"
                                        }`} />
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleSaveNotifications}
                                disabled={isLoading}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Save size={16} />
                                {isLoading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    )}

                    {/* Privacy Settings */}
                    {activeTab === "privacy" && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white mb-4">Privacy & Security</h3>
                            
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-800/50 rounded-lg">
                                    <h4 className="font-medium text-white mb-3">Profile Visibility</h4>
                                    <select
                                        value={privacySettings.profileVisibility}
                                        onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="public">Public</option>
                                        <option value="friends">Friends Only</option>
                                        <option value="private">Private</option>
                                    </select>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-white">Show Rental History</h4>
                                        <p className="text-sm text-gray-400">Display your rental history on your profile</p>
                                    </div>
                                    <button
                                        onClick={() => setPrivacySettings({...privacySettings, showRentalHistory: !privacySettings.showRentalHistory})}
                                        className={`w-12 h-6 rounded-full transition-colors ${
                                            privacySettings.showRentalHistory ? "bg-blue-600" : "bg-gray-600"
                                        }`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                            privacySettings.showRentalHistory ? "translate-x-6" : "translate-x-0.5"
                                        }`} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-white">Allow Reviews</h4>
                                        <p className="text-sm text-gray-400">Let others review your rental experience</p>
                                    </div>
                                    <button
                                        onClick={() => setPrivacySettings({...privacySettings, allowReviews: !privacySettings.allowReviews})}
                                        className={`w-12 h-6 rounded-full transition-colors ${
                                            privacySettings.allowReviews ? "bg-blue-600" : "bg-gray-600"
                                        }`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                            privacySettings.allowReviews ? "translate-x-6" : "translate-x-0.5"
                                        }`} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-white">Two-Factor Authentication</h4>
                                        <p className="text-sm text-gray-400">Add an extra layer of security</p>
                                    </div>
                                    <button
                                        onClick={() => setPrivacySettings({...privacySettings, twoFactorAuth: !privacySettings.twoFactorAuth})}
                                        className={`w-12 h-6 rounded-full transition-colors ${
                                            privacySettings.twoFactorAuth ? "bg-blue-600" : "bg-gray-600"
                                        }`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                            privacySettings.twoFactorAuth ? "translate-x-6" : "translate-x-0.5"
                                        }`} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-white">Data Sharing</h4>
                                        <p className="text-sm text-gray-400">Share anonymous data for product improvement</p>
                                    </div>
                                    <button
                                        onClick={() => setPrivacySettings({...privacySettings, dataSharing: !privacySettings.dataSharing})}
                                        className={`w-12 h-6 rounded-full transition-colors ${
                                            privacySettings.dataSharing ? "bg-blue-600" : "bg-gray-600"
                                        }`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                            privacySettings.dataSharing ? "translate-x-6" : "translate-x-0.5"
                                        }`} />
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleSavePrivacy}
                                disabled={isLoading}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Save size={16} />
                                {isLoading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    )}

                    {/* Appearance Settings */}
                    {activeTab === "appearance" && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white mb-4">Appearance</h3>
                            
                            <div className="space-y-4">
                                <div className="p-4 bg-gray-800/50 rounded-lg">
                                    <h4 className="font-medium text-white mb-3">Theme</h4>
                                    <div className="grid grid-cols-3 gap-3">
                                        <button
                                            onClick={() => setAppearanceSettings({...appearanceSettings, theme: "light"})}
                                            className={`p-3 rounded-lg border-2 transition-colors ${
                                                appearanceSettings.theme === "light" 
                                                    ? "border-blue-600 bg-blue-600/20" 
                                                    : "border-gray-600 hover:border-gray-500"
                                            }`}
                                        >
                                            <div className="text-center">
                                                <div className="w-8 h-8 bg-white rounded-full mb-2 mx-auto"></div>
                                                <span className="text-sm text-white">Light</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => setAppearanceSettings({...appearanceSettings, theme: "dark"})}
                                            className={`p-3 rounded-lg border-2 transition-colors ${
                                                appearanceSettings.theme === "dark" 
                                                    ? "border-blue-600 bg-blue-600/20" 
                                                    : "border-gray-600 hover:border-gray-500"
                                            }`}
                                        >
                                            <div className="text-center">
                                                <div className="w-8 h-8 bg-gray-900 rounded-full mb-2 mx-auto"></div>
                                                <span className="text-sm text-white">Dark</span>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => setAppearanceSettings({...appearanceSettings, theme: "system"})}
                                            className={`p-3 rounded-lg border-2 transition-colors ${
                                                appearanceSettings.theme === "system" 
                                                    ? "border-blue-600 bg-blue-600/20" 
                                                    : "border-gray-600 hover:border-gray-500"
                                            }`}
                                        >
                                            <div className="text-center">
                                                <div className="w-8 h-8 bg-gradient-to-r from-white to-gray-900 rounded-full mb-2 mx-auto"></div>
                                                <span className="text-sm text-white">System</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-800/50 rounded-lg">
                                    <h4 className="font-medium text-white mb-3">Language</h4>
                                    <select
                                        value={appearanceSettings.language}
                                        onChange={(e) => setAppearanceSettings({...appearanceSettings, language: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Español</option>
                                        <option value="fr">Français</option>
                                        <option value="de">Deutsch</option>
                                        <option value="zh">中文</option>
                                    </select>
                                </div>

                                <div className="p-4 bg-gray-800/50 rounded-lg">
                                    <h4 className="font-medium text-white mb-3">Font Size</h4>
                                    <select
                                        value={appearanceSettings.fontSize}
                                        onChange={(e) => setAppearanceSettings({...appearanceSettings, fontSize: e.target.value})}
                                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                    </select>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-white">Animations</h4>
                                        <p className="text-sm text-gray-400">Enable interface animations</p>
                                    </div>
                                    <button
                                        onClick={() => setAppearanceSettings({...appearanceSettings, animationsEnabled: !appearanceSettings.animationsEnabled})}
                                        className={`w-12 h-6 rounded-full transition-colors ${
                                            appearanceSettings.animationsEnabled ? "bg-blue-600" : "bg-gray-600"
                                        }`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                            appearanceSettings.animationsEnabled ? "translate-x-6" : "translate-x-0.5"
                                        }`} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-white">High Contrast</h4>
                                        <p className="text-sm text-gray-400">Increase contrast for better visibility</p>
                                    </div>
                                    <button
                                        onClick={() => setAppearanceSettings({...appearanceSettings, highContrast: !appearanceSettings.highContrast})}
                                        className={`w-12 h-6 rounded-full transition-colors ${
                                            appearanceSettings.highContrast ? "bg-blue-600" : "bg-gray-600"
                                        }`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                            appearanceSettings.highContrast ? "translate-x-6" : "translate-x-0.5"
                                        }`} />
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleSaveAppearance}
                                disabled={isLoading}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Save size={16} />
                                {isLoading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    )}

                    {/* Security Settings */}
                    {activeTab === "security" && (
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white mb-4">Security</h3>
                            
                            {/* Change Password */}
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-medium text-white mb-4">Change Password</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
                                        <div className="relative">
                                            <input
                                                type={passwordData.showCurrentPassword ? "text" : "password"}
                                                value={passwordData.currentPassword}
                                                onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                                className="w-full px-4 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setPasswordData({...passwordData, showCurrentPassword: !passwordData.showCurrentPassword})}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                            >
                                                {passwordData.showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                                        <div className="relative">
                                            <input
                                                type={passwordData.showNewPassword ? "text" : "password"}
                                                value={passwordData.newPassword}
                                                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                                className="w-full px-4 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setPasswordData({...passwordData, showNewPassword: !passwordData.showNewPassword})}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                            >
                                                {passwordData.showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
                                        <div className="relative">
                                            <input
                                                type={passwordData.showConfirmPassword ? "text" : "password"}
                                                value={passwordData.confirmPassword}
                                                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                                className="w-full px-4 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setPasswordData({...passwordData, showConfirmPassword: !passwordData.showConfirmPassword})}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                            >
                                                {passwordData.showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleChangePassword}
                                    disabled={isLoading}
                                    className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <Shield size={16} />
                                    {isLoading ? "Updating..." : "Update Password"}
                                </button>
                            </div>

                            {/* Account Actions */}
                            <div className="p-4 bg-gray-800/50 rounded-lg">
                                <h4 className="font-medium text-white mb-4">Account Actions</h4>
                                <div className="space-y-3">
                                    <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-left">
                                        Download Your Data
                                    </button>
                                    <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-left">
                                        Clear Browsing History
                                    </button>
                                    <button 
                                        onClick={logout}
                                        className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-left"
                                    >
                                        Sign Out from All Devices
                                    </button>
                                    <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-left">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
