import { getTheme } from './registry';
import { EditorialHome, EditorialJournalArchive, EditorialJournalDetail } from './editorial/views';
import { MinimalHome, MinimalJournalArchive, MinimalJournalDetail } from './minimal/views';
import { CreativeHome, CreativeJournalArchive, CreativeJournalDetail } from './creative/views';
import { AcademicHome, AcademicJournalArchive, AcademicJournalDetail } from './academic/views';

interface ThemeWrapperProps {
  themeId?: string;
  viewType: 'home' | 'journal-archive' | 'journal-detail';
  data: any;
}

export function ThemeWrapper({ themeId = 'editorial', viewType, data }: ThemeWrapperProps) {
  const theme = getTheme(themeId);

  // Select view component based on theme and viewType
  if (themeId === 'minimal') {
    if (viewType === 'home') return <MinimalHome data={data} />;
    if (viewType === 'journal-archive') return <MinimalJournalArchive data={data} />;
    if (viewType === 'journal-detail') return <MinimalJournalDetail data={data} />;
  }

  if (themeId === 'creative') {
    if (viewType === 'home') return <CreativeHome data={data} />;
    if (viewType === 'journal-archive') return <CreativeJournalArchive data={data} />;
    if (viewType === 'journal-detail') return <CreativeJournalDetail data={data} />;
  }

  if (themeId === 'academic') {
    if (viewType === 'home') return <AcademicHome data={data} />;
    if (viewType === 'journal-archive') return <AcademicJournalArchive data={data} />;
    if (viewType === 'journal-detail') return <AcademicJournalDetail data={data} />;
  }

  // Default Editorial
  if (viewType === 'home') return <EditorialHome data={data} />;
  if (viewType === 'journal-archive') return <EditorialJournalArchive data={data} />;
  if (viewType === 'journal-detail') return <EditorialJournalDetail data={data} />;

  return <EditorialHome data={data} />;
}
