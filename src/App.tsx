import React, { useState } from 'react';
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
import { storageService } from './services/storageService';
import { GenzVisualIdea } from './types/genz';
import { AppSettings } from './types/settings';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('miniweb');
  const [settings, setSettings] = useState<AppSettings>(() => storageService.getSettings());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [activeMemeModalIdea, setActiveMemeModalIdea] = useState<GenzVisualIdea | null>(null);

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
        settings={settings}
        onToggleSound={handleToggleSound}
        openSettingsModal={() => setIsSettingsOpen(true)}
        openGuideModal={() => setIsGuideOpen(true)}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 flex overflow-hidden relative">
        {activeTab === 'miniweb' && <MiniWebWorkspace initialServiceId="gemini" />}
        {activeTab === 'ielts' && <IeltsWorkspace />}
        {activeTab === 'genz' && <GenzWorkspace />}
        {activeTab === 'universe' && <UniverseWorkspace />}
        {activeTab === 'action' && <ActionEngineWorkspace />}
        {activeTab === 'fishbone' && <FishboneWorkspace />}
        {activeTab === 'library' && (
          <GenzSavedLibrary onOpenImageModal={(idea) => setActiveMemeModalIdea(idea)} />
        )}
      </main>

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
