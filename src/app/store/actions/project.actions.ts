import { Action } from '@ngrx/store';

export enum ProjectActionTypes {
  INIT = '[Project] - Get project',
    INIT_SUCCESS = '[Project] - Get project success',
    INIT_FAILURE = '[Project] - Get project failure',
    PROJECT_ADDSECTION = '[Project] - Add section',
    PROJECT_ADDSECTION_SUCCESS = '[Project] - Add section success',
    PROJECT_ADDSECTION_FAILURE = '[Project] - Add section failure',
    PROJECT_ADDSUBSECTION = '[Project] - Add subsection',
    PROJECT_ADDSUBSECTION_SUCCESS = '[Project] - Add subsection success',
    PROJECT_ADDSUBSECTION_FAILURE = '[Project] - Add subsection failure',
    PROJECT_DELETESECTION = '[Project] - Delete section',
    PROJECT_DELETESECTION_SUCCESS = '[Project] - Delete section success',
    PROJECT_DELETESECTION_FAILURE = '[Project] - Delete section failure',
    PROJECT_DELETESUBSECTION = '[Project] - Delete subsection',
    PROJECT_DELETESUBSECTION_SUCCESS = '[Project] - Delete subsection success',
    PROJECT_DELETESUBSECTION_FAILURE = '[Project] - Delete subsection failure',
    PROJECT_UPDATESUMMARY = '[Project] - Update project summary',
    PROJECT_UPDATESUMMARY_SUCCESS = '[Project] - Update project summary success',
    PROJECT_UPDATESUMMARY_FAILURE = '[Project] - Update project summary failure',
    PROJECT_UPDATECONTENT = '[Project] - Update project content',
    PROJECT_UPDATECONTENT_SUCCESS = '[Project] - Update project content success',
    PROJECT_UPDATECONTENT_FAILURE = '[Project] - Update project content failure',
    PROJECT_UPDATESECTIONSUMMARY = '[Project] - Update section summary',
    PROJECT_UPDATESECTIONSUMMARY_SUCCESS = '[Project] - Update section summary success',
    PROJECT_UPDATESECTIONSUMMARY_FAILURE = '[Project] - Update section summary failure',
    PROJECT_UPDATETITLE = '[Project] - Update title',
    PROJECT_UPDATETITLE_SUCCESS = '[Project] - Update title success',
    PROJECT_UPDATETITLE_FAILURE = '[Project] - Update title failure',
    PROJECT_UPDATESECTIONTITLE = '[Project] - Update section title',
    PROJECT_UPDATESECTIONTITLE_SUCCESS = '[Project] - Update section title success',
    PROJECT_UPDATESECTIONTITLE_FAILURE = '[Project] - Update section title failure',
    PROJECT_UPDATESECTIONTEXT = '[Project] - Update section text',
    PROJECT_UPDATESECTIONTEXT_SUCCESS = '[Project] - Update section text success',
    PROJECT_UPDATESECTIONTEXT_FAILURE = '[Project] - Update section text failure',
    PROJECT_UPDATESUBSECTIONTITLE = '[Project] - Update subsection title',
    PROJECT_UPDATESUBSECTIONTITLE_SUCCESS = '[Project] - Update subsection title success',
    PROJECT_UPDATESUBSECTIONTITLE_FAILURE = '[Project] - Update subsection title failure',
    PROJECT_SUBSECTIONS_CLICK = '[Project] - SubSections click',
    PROJECT_ADDBOARD = '[Project] - Add board',
    PROJECT_ADDBOARD_SUCCESS = '[Project] - Add board success',
    PROJECT_ADDBOARD_FAILURE = '[Project] - Add board failure',
    PROJECT_SECTIONADDBOARD = '[Project] - Section add board',
    PROJECT_SECTIONADDBOARD_SUCCESS = '[Project] - Section add board success',
    PROJECT_SECTIONADDBOARD_FAILURE = '[Project] - Section add board failure',
    PROJECT_UPDATEBOARDNAME = '[Project] - Update project board name',
    PROJECT_UPDATEBOARDNAME_SUCCESS = '[Project] - Update project board name success',
    PROJECT_UPDATEBOARDNAME_FAILURE = '[Project] - Update project borad name failure',
    PROJECT_UPDATESECTIONBOARDNAME = '[Project] - Update section board name',
    PROJECT_UPDATESECTIONBOARDNAME_SUCCESS = '[Project] - Update section board name success',
    PROJECT_UPDATESECTIONBOARDNAME_FAILURE = '[Project] - Update section board name failure',
    PROJECT_CLOSEBOARDS = '[Project] - close boards on switch',
    PROJECT_DELETESECTIONBOARD = '[Project] - Delete section board',
    PROJECT_DELETESECTIONBOARD_SUCCESS = '[Project] - Delete section board success',
    PROJECT_DELETESECTIONBOARD_FAILURE = '[Project] - Delete section board failure',
    PROJECT_DELETEBOARD = '[Project] - Delete board',
    PROJECT_DELETEBOARD_SUCCESS = '[Project] - Delete board success',
    PROJECT_DELETEBOARD_FAILURE = '[Project] - Delete board failure',
    PROJECT_BOARDADDNOTE = '[Project] - Board add note',
    PROJECT_BOARDADDNOTE_SUCCESS = '[Project] - Board add note success',
    PROJECT_BOARDADDNOTE_FAILURE = '[Project] - Borad add note failure',
    PROJECT_SECTIONBOARDADDNOTE = '[Project] - Section board add note',
    PROJECT_SECTIONBOARDADDNOTE_SUCCESS = '[Project] - Section board add note success',
    PROJECT_SECTIONBOARDADDNOTE_FAILURE = '[Project] - Section board add note failure',
    PROJECT_BOARDDELETENOTE = '[Project] - Board delete note',
    PROJECT_BOARDDELETENOTE_SUCCESS = '[Project] - Board delete note success',
    PROJECT_BOARDDELETENOTE_FAILURE = '[Project] - Board delete note failure',
    PROJECT_SECTIONBOARDDELETENOTE = '[Project] - Section board delete note',
    PROJECT_SECTIONBOARDDELETENOTE_SUCCESS = '[Project] - Section board delete note success',
    PROJECT_SECTIONBOARDDELETENOTE_FAILURE = '[Project] - Section board delete note failure',
    PROJECT_UPDATENOTETITLE = '[Prject] - Update note title',
    PROJECT_UPDATENOTETITLE_SUCCESS = '[Project] - Update note title success',
    PROJECT_UPDATENOTETITLE_FAILURE = '[Project] - Update note title failure',
    PROJECT_SECTIONUPDATENOTETITLE = '[Project] - Section update note title',
    PROJECT_SECTIONUPDATENOTETITLE_SUCCESS = '[Project] - Section update note title success',
    PROJECT_SECTIONUPDATENOTETITLE_FAILURE = '[Project] - Section update note title failure',
    PROJECT_UPDATENOTETEXT = '[Project] - Update note text',
    PROJECT_UPDATENOTETEXT_SUCCESS = '[Project] - Update note text success',
    PROJECT_UPDATENOTETEXT_FAILURE = '[Project] - Update note text failure',
    PROJECT_SECTIONUPDATENOTETEXT = '[Project] - Section update note text',
    PROJECT_SECTIONUPDATENOTETEXT_SUCCESS = '[Project] - Section update note text success',
    PROJECT_SECTIONUPDATENOTETEXT_FAILURE = '[Project] - Section update note text failure',
    PROJECT_EXPORT = '[Project] - export project',
    PROJECT_EXPORT_SUCCESS = '[Project] - export project success',
    PROJECT_EXPORT_FAILURE = '[Project] - export project failure',
    PROJECT_ADDVERSION = '[Project] - add version project',
    PROJECT_ADDVERSION_SUCCESS = '[Project] - add version project success',
    PROJECT_ADDVERSION_FAILURE = '[Project] - add version project failure',
    PROJECT_UPDATEVERSION = '[Project] - update version project',
    PROJECT_UPDATEVERSION_SUCCESS = '[Project] - update version project',
    PROJECT_UPDATEVERSION_FAILURE = '[Project] - update version project',
    PROJECT_DELETEVERSION = '[Project] - delete version project',
    PROJECT_DELETEVERSION_SUCCESS = '[Project] - delete version project success',
    PROJECT_DELETEVERISON_FAILURE = '[Project] - delete version project failure',
    PROJECT_UPDATEBOARDCOLOR = '[Project] - Update board color',
    PROJECT_UPDATEBOARDCOLOR_SUCCESS = '[Project] - Update board color success',
    PROJECT_UPDATEBOARDCOLOR_FAILURE = '[Project] - Update board color failure',
    PROJECT_UPDATESECTIONBOARDCOLOR = '[Project] - Update section board color',
    PROJECT_UPDATESECTIONBOARDCOLOR_SUCCESS = '[Project] - Update section board color success',
    PROJECT_UPDATESECTIONBOARDCOLOR_FAILURE = '[Project] - Update section board color failure',
    PROJECT_UPDATEBOARDICON = '[Project] - Update board icon',
    PROJECT_UPDATEBOARDICON_SUCCESS = '[Project] - Update board icon success',
    PROJECT_UPDATEBOARDICON_FAILURE = '[Project] - Update board icon failure',
    PROJECT_UPDATESECTIONBOARDICON = '[Project] - Update section board icon',
    PROJECT_UPDATESECTIONBOARDICON_SUCCESS = '[Project] - Update section board icon success',
    PROJECT_UPDATESECTIONBOARDICON_FAILURE = '[Project] - Update section board icon failure',
    PROJECT_UPDATESECTIONORDER = '[Project] - Update section order',
    PROJECT_UPDATESECTIONORDER_SUCCESS = '[Project] - Update section order success',
    PROJECT_UPDATESECTIONORDER_FAILURE = '[Project] - Update section order failure',
    PROJECT_UPDATESUBSECTIONORDER = '[Project] - Update subsection order',
    PROJECT_UPDATESUBSECTIONORDER_SUCCESS = '[Project] - Update subsection order success',
    PROJECT_UPDATESUBSECTIONORDER_FAILURE = '[Project] - Update subsection order failure'
}

export class Init implements Action {
  readonly type = ProjectActionTypes.INIT;
  constructor(public payload: any) {}
}

export class InitSuccess implements Action {
  readonly type = ProjectActionTypes.INIT_SUCCESS;
  constructor(public payload: any) {}
}

export class InitFailure implements Action {
  readonly type = ProjectActionTypes.INIT_FAILURE;
  constructor(public payload: any) {}
}

export class AddSection implements Action {
  readonly type = ProjectActionTypes.PROJECT_ADDSECTION;
  constructor(public payload: any) {}
}

export class AddSectionSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_ADDSECTION_SUCCESS;
  constructor(public payload: any) {}
}

export class AddSectionFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_ADDSECTION_FAILURE;
  constructor(public payload: any) {}
}

export class AddSubsection implements Action {
  readonly type = ProjectActionTypes.PROJECT_ADDSUBSECTION;
  constructor(public payload: any) {}
}

export class AddSubsectionSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_ADDSUBSECTION_SUCCESS;
  constructor(public payload: any) {}
}

export class AddSubsectionFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_ADDSUBSECTION_FAILURE;
  constructor(public payload: any) {}
}

export class DeleteSubsection implements Action {
  readonly type = ProjectActionTypes.PROJECT_DELETESUBSECTION;
  constructor(public payload: any) {}
}

export class DeleteSubsectionSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_DELETESUBSECTION_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteSubsectionFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_DELETESUBSECTION_FAILURE;
  constructor(public payload: any) {}
}

export class DeleteSection implements Action {
  readonly type = ProjectActionTypes.PROJECT_DELETESECTION;
  constructor(public payload: any) {}
}

export class DeleteSectionSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_DELETESECTION_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteSectionFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_DELETESECTION_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateProjectSummary implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESUMMARY;
  constructor(public payload: any) {}
}

export class UpdateProjectSummarySuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESUMMARY_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateProjectSummaryFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESUMMARY_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateProjectContent implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATECONTENT;
  constructor(public payload: any) {}
}

export class UpdateProjectContentSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATECONTENT_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateProjectContentFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATECONTENT_FAILURE;
  constructor(public payload: any) {}
}
export class UpdateSectionSummary implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONSUMMARY;
  constructor(public payload: any) {}
}

export class UpdateSectionSummarySuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONSUMMARY_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateSectionSummaryFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONSUMMARY_FAILURE;
  constructor(public payload: any) {}
}
export class UpdateSectionOrder implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONORDER;
  constructor(public payload: any) {}
}

export class UpdateSectionOrderSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONORDER_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateSectionOrderFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONORDER_FAILURE;
  constructor(public payload: any) {}
}
export class UpdateSubSectionOrder implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESUBSECTIONORDER;
  constructor(public payload: any) {}
}

export class UpdateSubSectionOrderSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESUBSECTIONORDER_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateSubSectionOrderFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESUBSECTIONORDER_FAILURE;
  constructor(public payload: any) {}
}
export class UpdateProjectTitle implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATETITLE;
  constructor(public payload: any) {}
}

export class UpdateProjectTitleSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATETITLE_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateProjectTitleFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATETITLE_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateSectionTitle implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONTITLE;
  constructor(public payload: any) {}
}

export class UpdateSectionTitleSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONTITLE_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateSectionTitleFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONTITLE_FAILURE;
  constructor(public payload: any) {}
}

export class SubSectionClick implements Action {
  readonly type = ProjectActionTypes.PROJECT_SUBSECTIONS_CLICK;
  constructor(public payload: any) {}
}

export class UpdateSectionText implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONTEXT;
  constructor(public payload: any) {}
}

export class UpdateSectionTextSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONTEXT_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateSectionTextFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONTEXT_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateSubsectionTitle implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESUBSECTIONTITLE;
  constructor(public payload: any) {}
}

export class UpdateSubsectionTitleSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESUBSECTIONTITLE_SUCCESS;
  constructor(public payload: any) {}
}
export class UpdateSubsectionTitleFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESUBSECTIONTITLE_FAILURE;
  constructor(public payload: any) {}
}

export class ProjectAddBoard implements Action {
  readonly type = ProjectActionTypes.PROJECT_ADDBOARD;
  constructor(public payload: any) {}
}

export class ProjectAddBoardSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_ADDBOARD_SUCCESS;
  constructor(public payload: any) {}
}

export class ProjectAddBoardFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_ADDBOARD_FAILURE;
  constructor(public payload: any) {}
}

export class SectionAddBoard implements Action {
  readonly type = ProjectActionTypes.PROJECT_SECTIONADDBOARD;
  constructor(public payload: any) {}
}

export class SectionAddBoardSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_SECTIONADDBOARD_SUCCESS;
  constructor(public payload: any) {}
}

export class SectionAddBoardFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_SECTIONADDBOARD_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateProjectBoardName implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATEBOARDNAME;
  constructor(public payload: any) {}
}

export class UpdateProjectBoardNameSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATEBOARDNAME_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateProjectBoardNameFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATEBOARDNAME_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateSectionBoardName implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONBOARDNAME;
  constructor(public payload: any) {}
}

export class UpdateSectionBoardNameSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONBOARDNAME_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateSectionBoardNameFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONBOARDNAME_FAILURE;
  constructor(public payload: any) {}
}
export class CloseBoards implements Action {
  readonly type = ProjectActionTypes.PROJECT_CLOSEBOARDS;
  constructor(public payload: any) {}
}

export class DeleteSectionBoard implements Action {
  readonly type = ProjectActionTypes.PROJECT_DELETESECTIONBOARD;
  constructor(public payload: any) {}
}

export class DeleteSectionBoardSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_DELETESECTIONBOARD_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteSectionBoardFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_DELETESECTIONBOARD_FAILURE;
  constructor(public payload: any) {}
}

export class DeleteProjectBoard implements Action {
  readonly type = ProjectActionTypes.PROJECT_DELETEBOARD;
  constructor(public payload: any) {}
}

export class DeleteProjectBoardSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_DELETEBOARD_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteProjectBoardFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_DELETEBOARD_FAILURE;
  constructor(public payload: any) {}
}
export class ProjectBoardAddNote implements Action {
  readonly type = ProjectActionTypes.PROJECT_BOARDADDNOTE;
  constructor(public payload: any) {}
}

export class ProjectBoardAddNoteSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_BOARDADDNOTE_SUCCESS;
  constructor(public payload: any) {}
}

export class ProjectBoardAddNoteFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_BOARDADDNOTE_FAILURE;
  constructor(public payload: any) {}
}

export class SectionBoardAddNote implements Action {
  readonly type = ProjectActionTypes.PROJECT_SECTIONBOARDADDNOTE;
  constructor(public payload: any) {}
}

export class SectionBoardAddNoteSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_SECTIONBOARDADDNOTE_SUCCESS;
  constructor(public payload: any) {}
}

export class SectionBoardAddNoteFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_SECTIONBOARDADDNOTE_FAILURE;
  constructor(public payload: any) {}
}

export class SectionBoardDeleteNote implements Action {
  readonly type = ProjectActionTypes.PROJECT_SECTIONBOARDDELETENOTE;
  constructor(public payload: any) {}
}

export class SectionBoardDeleteNoteSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_SECTIONBOARDDELETENOTE_SUCCESS;
  constructor(public payload: any) {}
}

export class SectionBoardDeleteNoteFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_SECTIONBOARDDELETENOTE_FAILURE;
  constructor(public payload: any) {}
}

export class ProjectBoardDeleteNote implements Action {
  readonly type = ProjectActionTypes.PROJECT_BOARDDELETENOTE;
  constructor(public payload: any) {}
}

export class ProjectBoardDeleteNoteSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_BOARDDELETENOTE_SUCCESS;
  constructor(public payload: any) {}
}

export class ProjectBoardDeleteNoteFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_BOARDDELETENOTE_FAILURE;
  constructor(public payload: any) {}
}

export class ProjectUpdateNoteTitle implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATENOTETITLE;
  constructor(public payload: any) {}
}

export class ProjectUpdateNoteTitleSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATENOTETITLE_SUCCESS;
  constructor(public payload: any) {}
}

export class ProjectUpdateNoteTitleFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATENOTETITLE_FAILURE;
  constructor(public payload: any) {}
}

export class SectionUpdateNoteTitle implements Action {
  readonly type = ProjectActionTypes.PROJECT_SECTIONUPDATENOTETITLE;
  constructor(public payload: any) {}
}

export class SectionUpdateNoteTitleSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_SECTIONUPDATENOTETITLE_SUCCESS;
  constructor(public payload: any) {}
}

export class SectionUpdateNoteTitleFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_SECTIONUPDATENOTETITLE_FAILURE;
  constructor(public payload: any) {}
}

export class ProjectUpdateNoteText implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATENOTETEXT;
  constructor(public payload: any) {}
}

export class ProjectUpdateNoteTextSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATENOTETEXT_SUCCESS;
  constructor(public payload: any) {}
}

export class ProjectUpdateNoteTextFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATENOTETEXT_FAILURE;
  constructor(public payload: any) {}
}

export class SectionUpdateNoteText implements Action {
  readonly type = ProjectActionTypes.PROJECT_SECTIONUPDATENOTETEXT;
  constructor(public payload: any) {}
}

export class SectionUpdateNoteTextSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_SECTIONUPDATENOTETEXT_SUCCESS;
  constructor(public payload: any) {}
}

export class SectionUpdateNoteTextFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_SECTIONUPDATENOTETEXT_FAILURE;
  constructor(public payload: any) {}
}
export class ProjectExport implements Action {
  readonly type = ProjectActionTypes.PROJECT_EXPORT;
  constructor(public payload: any) {}
}
export class ProjectExportSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_EXPORT_SUCCESS;
  constructor(public payload: any) {}
}
export class ProjectExportFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_EXPORT_FAILURE;
  constructor(public payload: any) {}
}

export class VersionAdd implements Action {
  readonly type = ProjectActionTypes.PROJECT_ADDVERSION;
  constructor(public payload: any) {}
}
export class VersionAddSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_ADDVERSION_SUCCESS;
  constructor(public payload: any) {}
}
export class VersionAddFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_ADDVERSION_FAILURE;
  constructor(public payload: any) {}
}

export class VersionUpdate implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATEVERSION;
  constructor(public payload: any) {}
}
export class VersionUpdateSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATEVERSION_SUCCESS;
  constructor(public payload: any) {}
}
export class VersionUpdateFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATEVERSION_FAILURE;
  constructor(public payload: any) {}
}

export class VersionDelete implements Action {
  readonly type = ProjectActionTypes.PROJECT_DELETEVERSION;
  constructor(public payload: any) {}
}
export class VersionDeleteSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_DELETEVERSION_SUCCESS;
  constructor(public payload: any) {}
}
export class VersionDeleteFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_DELETEVERISON_FAILURE;
  constructor(public payload: any) {}
}
export class UpdateProjectBoardColor implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATEBOARDCOLOR;
  constructor(public payload: any) {}
}
export class UpdateProjectBoardColorSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATEBOARDCOLOR_SUCCESS;
  constructor(public payload: any) {}
}
export class UpdateProjectBoardColorFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATEBOARDCOLOR_FAILURE;
  constructor(public payload: any) {}
}
export class UpdateSectionBoardColor implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONBOARDCOLOR;
  constructor(public payload: any) {}
}
export class UpdateSectionBoardColorSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONBOARDCOLOR_SUCCESS;
  constructor(public payload: any) {}
}
export class UpdateSectionBoardColorFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONBOARDCOLOR_FAILURE;
  constructor(public payload: any) {}
}
export class UpdateProjectBoardIcon implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATEBOARDICON;
  constructor(public payload: any) {}
}
export class UpdateProjectBoardIconSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATEBOARDICON_SUCCESS;
  constructor(public payload: any) {}
}
export class UpdateProjectBoardIconFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATEBOARDICON_FAILURE;
  constructor(public payload: any) {}
}
export class UpdateSectionBoardIcon implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONBOARDICON;
  constructor(public payload: any) {}
}
export class UpdateSectionBoardIconSuccess implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONBOARDICON_SUCCESS;
  constructor(public payload: any) {}
}
export class UpdateSectionBoardIconFailure implements Action {
  readonly type = ProjectActionTypes.PROJECT_UPDATESECTIONBOARDICON_FAILURE;
  constructor(public payload: any) {}
}
export type All = |
  Init |
  InitSuccess |
  InitFailure |
  AddSection |
  AddSectionFailure |
  AddSectionSuccess |
  AddSubsection |
  AddSubsectionFailure |
  AddSubsectionSuccess |
  DeleteSection |
  DeleteSectionFailure |
  DeleteSectionSuccess |
  DeleteSubsection |
  DeleteSubsectionFailure |
  DeleteSubsectionSuccess |
  UpdateProjectSummary |
  UpdateProjectSummarySuccess |
  UpdateProjectSummaryFailure |
  UpdateProjectContent |
  UpdateProjectContentSuccess |
  UpdateProjectContentFailure |
  UpdateSectionSummary |
  UpdateSectionSummarySuccess |
  UpdateSectionSummaryFailure |
  UpdateProjectTitle |
  UpdateProjectTitleSuccess |
  UpdateProjectTitleFailure |
  UpdateSectionTitle |
  UpdateSectionTitleSuccess |
  UpdateSectionTitleFailure |
  UpdateSectionText |
  UpdateSectionTextSuccess |
  UpdateSectionTextFailure |
  UpdateSubsectionTitle |
  UpdateSubsectionTitleSuccess |
  UpdateSubsectionTitleFailure |
  ProjectAddBoard |
  ProjectAddBoardSuccess |
  ProjectAddBoardFailure |
  SectionAddBoard |
  SectionAddBoardSuccess |
  SectionAddBoardFailure |
  UpdateProjectBoardName |
  UpdateProjectBoardNameSuccess |
  UpdateProjectBoardNameFailure |
  UpdateSectionBoardName |
  UpdateSectionBoardNameSuccess |
  UpdateSectionBoardNameFailure |
  CloseBoards |
  DeleteSectionBoard |
  DeleteSectionBoardFailure |
  DeleteSectionBoardSuccess |
  DeleteProjectBoard |
  DeleteProjectBoardFailure |
  DeleteProjectBoardSuccess |
  ProjectBoardAddNote |
  ProjectBoardAddNoteSuccess |
  ProjectBoardAddNoteFailure |
  SectionBoardAddNote |
  SectionBoardAddNoteSuccess |
  SectionBoardAddNoteFailure |
  SectionBoardDeleteNote |
  SectionBoardDeleteNoteSuccess |
  SectionBoardDeleteNoteFailure |
  ProjectBoardDeleteNote |
  ProjectBoardDeleteNoteSuccess |
  ProjectBoardDeleteNoteFailure |
  ProjectUpdateNoteTitle |
  ProjectUpdateNoteTitleSuccess |
  ProjectUpdateNoteTitleFailure |
  SectionUpdateNoteTitle |
  SectionUpdateNoteTitleSuccess |
  SectionUpdateNoteTitleFailure |
  SubSectionClick |
  ProjectUpdateNoteText |
  ProjectUpdateNoteTextSuccess |
  ProjectUpdateNoteTextFailure |
  SectionUpdateNoteText |
  SectionUpdateNoteTextSuccess |
  SectionUpdateNoteTextFailure |
  ProjectExport |
  ProjectExportSuccess |
  ProjectExportFailure |
  VersionAdd |
  VersionAddSuccess |
  VersionAddFailure |
  VersionUpdate |
  VersionUpdateSuccess |
  VersionUpdateFailure |
  VersionDelete |
  VersionDeleteFailure |
  VersionDeleteSuccess |
  UpdateProjectBoardColor |
  UpdateProjectBoardColorSuccess |
  UpdateProjectBoardColorFailure |
  UpdateSectionBoardColor |
  UpdateSectionBoardColorSuccess |
  UpdateSectionBoardColorFailure |
  UpdateProjectBoardIcon |
  UpdateProjectBoardIconSuccess |
  UpdateProjectBoardIconFailure |
  UpdateSectionBoardIcon |
  UpdateSectionBoardIconSuccess |
  UpdateSectionBoardIconFailure |
  UpdateSectionOrder |
  UpdateSectionOrderSuccess |
  UpdateSectionOrderFailure |
  UpdateSubSectionOrder |
  UpdateSubSectionOrderSuccess |
  UpdateSubSectionOrderFailure;
