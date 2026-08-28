import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/common/Navbar';
import { IeltsWorkspace } from './components/IeltsModule/IeltsWorkspace';
import { GenzWorkspace } from './components/GenzModule/GenzWorkspace';
import { GenzSavedLibrary } from './components/GenzModule/GenzSavedLibrary';
import { GenzMemeModal } from './components/GenzModule/GenzMemeModal';
import { UniverseWorkspace } from './components/UniverseModule/UniverseWorkspace';
import { ActionEngineWorkspace } from './components/ActionEngine/ActionEngineWorkspace';
import { FishboneWorkspace } from './components/Fishbone/FishboneWorkspace';
import { MiniWebWorkspace } from './components/MiniWeb/MiniWebWorkspace';
import { SettingsModal } from './components/Settings/SettingsModal';
import { AppGuideModal } from './components/common/AppGuideModal';
import { SocialNotificationHubModal } from './components/Notifications/SocialNotificationHubModal';
import { storageService } from './services/storageService';
import { notificationService } from './services/notificationService';
import { audioService } from './services/audioService';
import { GenzVisualIdea } from './types/genz';
import { AppSettings } from './types/settings';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('miniweb');
  const [activeMiniWebServiceId, setActiveMiniWebServiceId] = useState<string>('gemini');
  const [activeMiniWebUrl, setActiveMiniWebUrl] = useState<string | undefined>(undefined);
  const [miniWebSwitchToken, setMiniWebSwitchToken] = useState<number>(0);
  const [settings, setSettings] = useState<AppSettings>(() => storageService.getSettings());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isNotificationHubOpen, setIsNotificationHubOpen] = useState(false);
  const [activeMemeModalIdea, setActiveMemeModalIdea] = useState<GenzVisualIdea | null>(null);

  // Unified Direct Service Navigation
  const handleNavigateToMiniWebService = (platformId: string, link?: string) => {
    const validId = (platformId || 'gemini').toLowerCase();
    setActiveMiniWebServiceId(validId);
    if (link) setActiveMiniWebUrl(link);
    setMiniWebSwitchToken(Date.now());
    setActiveTab('miniweb');
  };

  // Listen for real-time social notifications from Facebook, Instagram, and Zalo webviews
  useEffect(() => {
    if (window.electronAPI?.onSocialNotification) {
      window.electronAPI.onSocialNotification((notif) => {
        notificationService.addNotification({
          platform: notif.platform,
          title: notif.title,
          message: notif.message,
          avatarUrl: notif.avatarUrl,
          link: notif.link,
          type: (notif.type as any) || 'message'
        });
        audioService.playBeep('success');
      });
    }
  }, []);

  const handleToggleSound = () => {
    const updated = { ...settings, soundEffects: !settings.soundEffects };
    setSettings(updated);
    storageService.saveSettings(updated);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onNavigateToMiniWeb={(serviceId) => handleNavigateToMiniWebService(serviceId)}
        settings={settings}
        onToggleSound={handleToggleSound}
        openSettingsModal={() => setIsSettingsOpen(true)}
        openGuideModal={() => setIsGuideOpen(true)}
        openNotificationHub={() => setIsNotificationHubOpen(true)}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 flex overflow-hidden relative">
        <div className={`w-full h-full ${activeTab === 'miniweb' ? 'flex' : 'hidden'}`}>
          <MiniWebWorkspace
            activeServiceId={activeMiniWebServiceId}
            onServiceChange={(id) => setActiveMiniWebServiceId(id)}
            targetUrl={activeMiniWebUrl}
            switchToken={miniWebSwitchToken}
          />
        </div>
        {activeTab === 'ielts' && <IeltsWorkspace />}
        {activeTab === 'genz' && <GenzWorkspace />}
        {activeTab === 'universe' && <UniverseWorkspace />}
        {activeTab === 'action' && <ActionEngineWorkspace />}
        {activeTab === 'fishbone' && <FishboneWorkspace />}
        {activeTab === 'library' && (
          <GenzSavedLibrary onOpenImageModal={(idea) => setActiveMemeModalIdea(idea)} />
        )}
      </main>

      {/* Social Notification Hub Modal */}
      <SocialNotificationHubModal
        isOpen={isNotificationHubOpen}
        onClose={() => setIsNotificationHubOpen(false)}
        onNavigateToService={(platformId, link) => handleNavigateToMiniWebService(platformId, link)}
        onOpenAIReply={(_) => {
          handleNavigateToMiniWebService('gemini');
        }}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={(s) => setSettings(s)}
      />

      {/* App Guide Modal */}
      <AppGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onSelectFeatureTab={(tab) => {
          setActiveTab(tab as ActiveTab);
          setIsGuideOpen(false);
        }}
      />

      {/* Global Meme Modal for Library */}
      {activeMemeModalIdea && (
        <GenzMemeModal
          isOpen={Boolean(activeMemeModalIdea)}
          onClose={() => setActiveMemeModalIdea(null)}
          idea={activeMemeModalIdea}
        />
      )}
    </div>
  );
};
