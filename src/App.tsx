import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/common/Navbar';
import { IeltsWorkspace } from './components/IeltsModule/IeltsWorkspace';
import { IeltsPartBankModal } from './components/IeltsModule/IeltsPartBankModal';
import { IeltsWritingWorkspace } from './components/IeltsWriting/IeltsWritingWorkspace';
import { IeltsWritingBankModal } from './components/IeltsWriting/IeltsWritingBankModal';
import { GenzWorkspace } from './components/GenzModule/GenzWorkspace';
import { GenzSavedLibrary } from './components/GenzModule/GenzSavedLibrary';
import { GenzMemeModal } from './components/GenzModule/GenzMemeModal';
import { UniverseWorkspace } from './components/UniverseModule/UniverseWorkspace';
import { DailyNewsCalendarWorkspace } from './components/NewsCalendar/DailyNewsCalendarWorkspace';
import { FishboneWorkspace } from './components/Fishbone/FishboneWorkspace';
import { MiniWebWorkspace } from './components/MiniWeb/MiniWebWorkspace';
import { SettingsModal } from './components/Settings/SettingsModal';
import { AppGuideModal } from './components/common/AppGuideModal';
import { SocialNotificationHubModal } from './components/Notifications/SocialNotificationHubModal';
import { storageService } from './services/storageService';
import { notificationService } from './services/notificationService';
import { audioService } from './services/audioService';
import { aiService } from './services/aiService';
import { GenzVisualIdea } from './types/genz';
import { AppSettings } from './types/settings';
import { MobileProjectSimulatorModal, MobileProjectTab } from './components/common/MobileProjectSimulatorModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('ielts');
  const [isSplitMode, setIsSplitMode] = useState<boolean>(false);
  const [splitPrompt, setSplitPrompt] = useState<string | undefined>(undefined);
  const [activeMiniWebServiceId, setActiveMiniWebServiceId] = useState<string>('gemini');
  const [activeMiniWebUrl, setActiveMiniWebUrl] = useState<string | undefined>(undefined);
  const [miniWebSwitchToken, setMiniWebSwitchToken] = useState<number>(0);
  const [settings, setSettings] = useState<AppSettings>(() => storageService.getSettings());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isNotificationHubOpen, setIsNotificationHubOpen] = useState(false);
  const [isGlobalPartBankOpen, setIsGlobalPartBankOpen] = useState(false);
  const [isWritingBankOpen, setIsWritingBankOpen] = useState(false);
  const [isGlobalMobileSimulatorOpen, setIsGlobalMobileSimulatorOpen] = useState(false);
  const [mobileSimulatorTab, setMobileSimulatorTab] = useState<MobileProjectTab>('ielts300');
  const [activeMemeModalIdea, setActiveMemeModalIdea] = useState<GenzVisualIdea | null>(null);

  // Unified Direct Service Navigation
  const handleNavigateToMiniWebService = (platformId: string, link?: string) => {
    const validId = (platformId || 'gemini').toLowerCase();
    setActiveMiniWebServiceId(validId);
    if (link) setActiveMiniWebUrl(link);
    setMiniWebSwitchToken(Date.now());
    setActiveTab('miniweb');
  };

  const handleSplitSendToGemini = (prompt: string) => {
    audioService.playBeep('decision');
    setActiveMiniWebServiceId('gemini');
    setSplitPrompt(prompt);
    setMiniWebSwitchToken(Date.now());
    setIsSplitMode(true);
    if (activeTab === 'miniweb') {
      setActiveTab('ielts');
    }
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
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'miniweb') {
            setIsSplitMode(false);
          }
        }}
        onNavigateToMiniWeb={(serviceId) => handleNavigateToMiniWebService(serviceId)}
        onOpen300Questions={() => setIsGlobalPartBankOpen(true)}
        onOpenWritingBank={() => setIsWritingBankOpen(true)}
        isSplitMode={isSplitMode}
        onToggleSplitMode={() => {
          setIsSplitMode(!isSplitMode);
          if (!isSplitMode && activeTab === 'miniweb') {
            setActiveTab('ielts');
          }
        }}
        onOpenMobileSimulator={() => {
          const tab: MobileProjectTab =
            activeTab === 'fishbone'
              ? 'fishbone'
              : activeTab === 'genz' || activeTab === 'library'
              ? 'genz'
              : 'ielts300';
          setMobileSimulatorTab(tab);
          setIsGlobalMobileSimulatorOpen(true);
        }}
        settings={settings}
        onToggleSound={handleToggleSound}
        openSettingsModal={() => setIsSettingsOpen(true)}
        openGuideModal={() => setIsGuideOpen(true)}
        openNotificationHub={() => setIsNotificationHubOpen(true)}
      />

      {/* Main Workspace Container with True Dual Split Screen (Left Learning, Right MiniWeb) */}
      <main className="flex-1 flex overflow-hidden relative">
        {/* Left Side: Learning Workspaces (IELTS, Writing, GenZ, Universe, Fishbone) */}
        <div className={`h-full overflow-hidden transition-all duration-200 ${
          isSplitMode
            ? 'w-[52%] shrink-0 border-r border-slate-800 flex flex-col'
            : activeTab === 'miniweb'
            ? 'hidden'
            : 'w-full flex-1 flex flex-col'
        }`}>
          {activeTab === 'ielts' && <IeltsWorkspace onSendToGemini={handleSplitSendToGemini} />}
          {activeTab === 'writing' && <IeltsWritingWorkspace />}
          {activeTab === 'genz' && <GenzWorkspace />}
          {activeTab === 'universe' && <UniverseWorkspace />}
          {activeTab === 'action' && <DailyNewsCalendarWorkspace />}
          {activeTab === 'fishbone' && <FishboneWorkspace />}
          {activeTab === 'library' && (
            <GenzSavedLibrary onOpenImageModal={(idea) => setActiveMemeModalIdea(idea)} />
          )}
        </div>

        {/* Right Side: MiniWeb Workspace (Always single persistent instance, zero black screen) */}
        <div className={`h-full transition-all duration-200 ${
          isSplitMode
            ? 'w-[48%] shrink-0 flex flex-col bg-slate-950'
            : activeTab === 'miniweb'
            ? 'w-full h-full flex flex-col'
            : 'hidden'
        }`}>
          <MiniWebWorkspace
            activeServiceId={activeMiniWebServiceId}
            onServiceChange={(id) => setActiveMiniWebServiceId(id)}
            targetUrl={activeMiniWebUrl}
            switchToken={miniWebSwitchToken}
            autoInjectPrompt={splitPrompt}
          />
        </div>
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

      {/* Global 300 Questions Bank Modal */}
      <IeltsPartBankModal
        isOpen={isGlobalPartBankOpen}
        onClose={() => setIsGlobalPartBankOpen(false)}
        defaultFullscreen={true}
        onOpenSplitGemini={(prompt) => {
          handleSplitSendToGemini(prompt);
        }}
        onSelectQuestion={async (payload) => {
          try {
            audioService.playBeep('success');
            const newLesson = await aiService.generateIeltsLesson({
              vocabListText: payload.vocab,
              readingText: payload.answer,
              questionText: payload.question,
              noOldVocab: false,
              partPreference: payload.part
            });
            if (payload.imageUrl) {
              newLesson.imageUrl = payload.imageUrl;
            }
            storageService.saveIeltsLesson(newLesson);
          } catch (err) {
            console.error('Generate lesson error:', err);
          } finally {
            setIsGlobalPartBankOpen(false);
            setActiveTab('ielts');
          }
        }}
      />

      {/* Global Mobile Project Simulator Modal */}
      <MobileProjectSimulatorModal
        isOpen={isGlobalMobileSimulatorOpen}
        onClose={() => setIsGlobalMobileSimulatorOpen(false)}
        initialTab={mobileSimulatorTab}
        onSelectIeltsQuestion={async (payload) => {
          try {
            audioService.playBeep('success');
            const newLesson = await aiService.generateIeltsLesson({
              vocabListText: payload.vocab,
              readingText: payload.answer,
              questionText: payload.question,
              noOldVocab: false,
              partPreference: payload.part
            });
            storageService.saveIeltsLesson(newLesson);
          } catch (err) {
            console.error('Generate lesson error:', err);
          } finally {
            setIsGlobalMobileSimulatorOpen(false);
            setActiveTab('ielts');
          }
        }}
      />

      {/* Global Writing 600 Bank Modal */}
      <IeltsWritingBankModal
        isOpen={isWritingBankOpen}
        onClose={() => setIsWritingBankOpen(false)}
        onSelectTask={(_) => {
          setActiveTab('writing');
          setIsWritingBankOpen(false);
        }}
      />
    </div>
  );
};
