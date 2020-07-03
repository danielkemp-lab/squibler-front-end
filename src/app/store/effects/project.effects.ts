import { forwardRef, Injectable, NgModule } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { ProjectService } from '../../_services';
import {
  AddSection,
  AddSectionFailure,
  AddSectionSuccess,
  AddSubsection,
  AddSubsectionFailure,
  AddSubsectionSuccess,
  DeleteProjectBoard,
  DeleteProjectBoardFailure,
  DeleteProjectBoardSuccess,
  DeleteSection,
  DeleteSectionBoard,
  DeleteSectionBoardFailure,
  DeleteSectionBoardSuccess,
  DeleteSectionFailure,
  DeleteSectionSuccess,
  DeleteSubsection,
  DeleteSubsectionFailure,
  DeleteSubsectionSuccess,
  Init,
  InitFailure,
  InitSuccess,
  ProjectActionTypes,
  ProjectAddBoard,
  ProjectAddBoardFailure,
  ProjectAddBoardSuccess,
  ProjectBoardAddNote,
  ProjectBoardAddNoteFailure,
  ProjectBoardAddNoteSuccess,
  ProjectBoardDeleteNote,
  ProjectBoardDeleteNoteFailure,
  ProjectBoardDeleteNoteSuccess,
  ProjectExport,
  ProjectExportFailure,
  ProjectExportSuccess,
  ProjectUpdateNoteText,
  ProjectUpdateNoteTextFailure,
  ProjectUpdateNoteTextSuccess,
  ProjectUpdateNoteTitle,
  ProjectUpdateNoteTitleFailure,
  ProjectUpdateNoteTitleSuccess,
  SectionAddBoard,
  SectionAddBoardFailure,
  SectionAddBoardSuccess,
  SectionBoardAddNote,
  SectionBoardAddNoteFailure,
  SectionBoardAddNoteSuccess,
  SectionBoardDeleteNote,
  SectionBoardDeleteNoteFailure,
  SectionBoardDeleteNoteSuccess,
  SectionUpdateNoteText,
  SectionUpdateNoteTextFailure,
  SectionUpdateNoteTextSuccess,
  SectionUpdateNoteTitle,
  SectionUpdateNoteTitleFailure,
  SectionUpdateNoteTitleSuccess,
  UpdateProjectBoardColor,
  UpdateProjectBoardColorFailure,
  UpdateProjectBoardColorSuccess,
  UpdateProjectBoardIcon,
  UpdateProjectBoardIconFailure,
  UpdateProjectBoardIconSuccess,
  UpdateProjectBoardName,
  UpdateProjectBoardNameFailure,
  UpdateProjectBoardNameSuccess,
  UpdateProjectContent,
  UpdateProjectContentFailure,
  UpdateProjectContentSuccess,
  UpdateProjectSummary,
  UpdateProjectSummaryFailure,
  UpdateProjectSummarySuccess,
  UpdateProjectTitle,
  UpdateProjectTitleFailure,
  UpdateProjectTitleSuccess,
  UpdateSectionBoardColor,
  UpdateSectionBoardColorFailure,
  UpdateSectionBoardColorSuccess,
  UpdateSectionBoardIcon,
  UpdateSectionBoardIconFailure,
  UpdateSectionBoardIconSuccess,
  UpdateSectionBoardName,
  UpdateSectionBoardNameFailure,
  UpdateSectionBoardNameSuccess,
  UpdateSectionOrder,
  UpdateSectionOrderFailure,
  UpdateSectionOrderSuccess,
  UpdateSectionSummary,
  UpdateSectionSummaryFailure,
  UpdateSectionSummarySuccess,
  UpdateSectionText,
  UpdateSectionTextFailure,
  UpdateSectionTextSuccess,
  UpdateSectionTitle,
  UpdateSectionTitleFailure,
  UpdateSectionTitleSuccess,
  UpdateSubSectionOrder,
  UpdateSubSectionOrderFailure,
  UpdateSubSectionOrderSuccess,
  UpdateSubsectionTitle,
  UpdateSubsectionTitleFailure,
  UpdateSubsectionTitleSuccess,
  VersionAdd,
  VersionAddFailure,
  VersionAddSuccess,
  VersionDelete,
  VersionDeleteFailure,
  VersionDeleteSuccess,
  VersionUpdate,
  VersionUpdateFailure,
  VersionUpdateSuccess
} from '../actions/project.actions';

@Injectable()
export class ProjectEffects {

  @Effect()
  Init: Observable < any > = this.actions
    .ofType(ProjectActionTypes.INIT)
    .map((action: Init) => action.payload)
    .switchMap(payload =>
      this.projectService.init(payload)
      .map(data => {
        if (data) { return new InitSuccess(data); } else { return new InitFailure({ error: 'Error!' }); }
      }));

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  InitSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.INIT_SUCCESS)
  );

  @Effect({ dispatch: false })
  InitFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.INIT_FAILURE)
  );

  @Effect()
  AddSection: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_ADDSECTION)
    .map((action: AddSection) => action.payload)
    .switchMap(payload =>
      this.projectService
      .addSection(payload)
      .map((data: any) => {
        if (data.ok) { return new AddSectionSuccess({ section: data.projectOutput.sectionsOutput[0].section }); } else { return new AddSectionFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  AddSectionFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_ADDSECTION_FAILURE)
  );

  @Effect({ dispatch: false })
  AddSectionSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_ADDSECTION_SUCCESS)
  );

  @Effect()
  AddSubsection: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_ADDSUBSECTION)
    .map((action: AddSubsection) => action.payload)
    .switchMap(payload =>
      this.projectService
      .addSubsection(payload)
      .map((data: any) => {
        if (data.ok) {
          return new AddSubsectionSuccess({
            sectionId: payload.sectionId,
            subSection: data.projectOutput.sectionsOutput[0].subSectionsOutput[0].subSection,
            sectionOpen: payload.sectionOpen
          });
        } else { return new AddSubsectionFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  AddSubsectionFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_ADDSUBSECTION_FAILURE)
  );

  @Effect({ dispatch: false })
  AddSubsectionSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_ADDSUBSECTION_SUCCESS)
  );

  @Effect()
  DeleteSubsection: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_DELETESUBSECTION)
    .map((action: DeleteSubsection) => action.payload)
    .switchMap(payload =>
      this.projectService
      .deleteSubsection(payload)
      .map((data: any) => {
        if (data.ok) {
          return new DeleteSubsectionSuccess({
            sectionId: payload.sectionId,
            subsectionId: payload.subsectionId,
            sectionOpen: payload.sectionOpen
          });
        } else { return new DeleteSubsectionFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  DeleteSubsectionFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_DELETESUBSECTION_FAILURE)
  );

  @Effect({ dispatch: false })
  DeleteSubsectionSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_DELETESUBSECTION_SUCCESS)
  );

  @Effect()
  DeleteSection: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_DELETESECTION)
    .map((action: DeleteSection) => action.payload)
    .switchMap(payload =>
      this.projectService
      .deleteSection(payload)
      .map((data: any) => {
        if (data.ok) {
          return new DeleteSectionSuccess({
            id: payload.sectionId
          });
        } else { return new DeleteSectionFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  DeleteSectionFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_DELETESECTION_FAILURE)
  );

  @Effect({ dispatch: false })
  DeleteSectionSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_DELETESECTION_SUCCESS)
  );

  @Effect()
  ProjectExport: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_EXPORT)
    .map((action: ProjectExport) => action.payload)
    .switchMap(payload =>
      this.projectService
      .exportProject(payload)
      .map((data: any) => {
        if (data) {
          return new ProjectExportSuccess({
            file: data
          });
        } else { return new ProjectExportFailure({ error: 'Error exporting file!' }); }
      }));

  @Effect({ dispatch: false })
  ProjectExportSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_EXPORT_SUCCESS)
  );

  @Effect({ dispatch: false })
  ProjectExportFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_EXPORT_FAILURE)
  );

  @Effect()
  UpdateProjectSummary: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_UPDATESUMMARY)
    .map((action: UpdateProjectSummary) => action.payload)
    .switchMap(payload =>
      this.projectService
      .updateProjectSummary(payload)
      .map((data: any) => {
        if (data.ok) { return new UpdateProjectSummarySuccess({ text: payload.text }); } else { return new UpdateProjectSummaryFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  UpdateProjectSummaryFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESUMMARY_FAILURE)
  );

  @Effect({ dispatch: false })
  UpdateProjectSummarySuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESUMMARY_SUCCESS)
  );

  @Effect()
  UpdateProjectContent: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_UPDATECONTENT)
    .map((action: UpdateProjectContent) => action.payload)
    .switchMap(payload =>
      this.projectService
      .updateProjectContent(payload)
      .map((data: any) => {
        if (data.ok) { return new UpdateProjectContentSuccess({ content: payload.content }); } else { return new UpdateProjectContentFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  UpdateProjectContentFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATECONTENT_FAILURE)
  );

  @Effect({ dispatch: false })
  UpdateProjectContentSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATECONTENT_SUCCESS)
  );
  @Effect()
  UpdateSectionSummary: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_UPDATESECTIONSUMMARY)
    .map((action: UpdateSectionSummary) => action.payload)
    .switchMap(payload =>
      this.projectService
      .updateSectionSummary(payload)
      .map((data: any) => {
        if (data.ok) {
          return new UpdateSectionSummarySuccess({
            sectionId: payload.sectionId,
            text: payload.text,
            sectionOpen: payload.sectionOpen
          });
        } else { return new UpdateSectionSummaryFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  UpdateSectionSummaryFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESECTIONSUMMARY_FAILURE)
  );

  @Effect({ dispatch: false })
  UpdateSectionSummarySuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESECTIONSUMMARY_SUCCESS)
  );
  @Effect()
  UpdateSectionOrder: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_UPDATESECTIONORDER)
    .map((action: UpdateSectionOrder) => action.payload)
    .switchMap(payload =>
      this.projectService
      .updateSectionOrder(payload)
      .map((data: any) => {
        if (data.ok) { return new UpdateSectionOrderSuccess({}); } else { return new UpdateSectionOrderFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  UpdateSectionOrderFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESECTIONORDER_FAILURE)
  );

  @Effect({ dispatch: false })
  UpdateSectionOrderSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESECTIONORDER_SUCCESS)
  );

  @Effect()
  UpdateSubSectionOrder: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_UPDATESUBSECTIONORDER)
    .map((action: UpdateSubSectionOrder) => action.payload)
    .switchMap(payload =>
      this.projectService
      .updateSubSectionOrder(payload)
      .map((data: any) => {
        if (data.ok) { return new UpdateSubSectionOrderSuccess({}); } else { return new UpdateSubSectionOrderFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  UpdateSubSectionOrderFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESUBSECTIONORDER_FAILURE)
  );

  @Effect({ dispatch: false })
  UpdateSubSectionOrderSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESUBSECTIONORDER_SUCCESS)
  );

  @Effect()
  UpdateProjectTitle: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_UPDATETITLE)
    .map((action: UpdateProjectTitle) => action.payload)
    .switchMap(payload =>
      this.projectService
      .updateProjectTitle(payload)
      .map((data: any) => {
        if (data.ok) { return new UpdateProjectTitleSuccess({ title: payload.value }); } else { return new UpdateProjectTitleFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  UpdateProjectTitleFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATETITLE_FAILURE)
  );

  @Effect({ dispatch: false })
  UpdateProjectTitleSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATETITLE_SUCCESS)
  );
  @Effect()
  UpdateSectionTitle: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_UPDATESECTIONTITLE)
    .map((action: UpdateSectionTitle) => action.payload)
    .switchMap(payload =>
      this.projectService
      .updateSectionTitle(payload)
      .map((data: any) => {
        if (data.ok) {
          return new UpdateSectionTitleSuccess({
            sectionId: payload.sectionId,
            title: payload.value,
            sectionOpen: payload.sectionOpen
          });
        } else { return new UpdateSectionTitleFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  UpdateSectionTitleFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESECTIONTITLE_FAILURE)
  );

  @Effect({ dispatch: false })
  UpdateSectionTitleSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESECTIONTITLE_SUCCESS)
  );

  @Effect()
  UpdateSectionText: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_UPDATESECTIONTEXT)
    .map((action: UpdateSectionText) => action.payload)
    .switchMap(payload =>
      this.projectService
      .updateSectionText(payload)
      .map((data: any) => {
        if (data.ok) {
          return new UpdateSectionTextSuccess({
            sectionId: payload.sectionId,
            value: payload.text,
            sectionOpen: payload.sectionOpen
          });
        } else { return new UpdateSectionTextFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  UpdateSectionTextFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESECTIONTEXT_FAILURE)
  );

  @Effect({ dispatch: false })
  UpdateSectionTextSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESECTIONTEXT_SUCCESS)
  );

  @Effect()
  UpdateSubsectionTitle: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_UPDATESUBSECTIONTITLE)
    .map((action: UpdateSubsectionTitle) => action.payload)
    .switchMap(payload =>
      this.projectService
      .updateSubsectionTitle(payload)
      .map((data: any) => {
        if (data.ok) {
          return new UpdateSubsectionTitleSuccess({
            sectionId: payload.sectionId,
            subsectionId: payload.subsectionId,
            value: payload.value,
            sectionOpen: payload.sectionOpen
          });
        } else { return new UpdateSubsectionTitleFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  UpdateSubsectionTitleFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESUBSECTIONTITLE_FAILURE)
  );

  @Effect({ dispatch: false })
  UpdateSubsectionTitleSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESUBSECTIONTITLE_SUCCESS)
  );

  @Effect()
  ProjectAddBoard: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_ADDBOARD)
    .map((action: ProjectAddBoard) => action.payload)
    .switchMap(payload =>
      this.projectService
      .addBoard(payload)
      .map((data: any) => {
        if (data.ok) {
          return new ProjectAddBoardSuccess({
            board: data.projectOutput.boardsOutput[0].board
          });
        } else { return new ProjectAddBoardFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  ProjectAddBoardFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_ADDBOARD_FAILURE)
  );

  @Effect({ dispatch: false })
  ProjectAddBoardSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_ADDBOARD_SUCCESS)
  );

  @Effect()
  SectionAddBoard: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_SECTIONADDBOARD)
    .map((action: SectionAddBoard) => action.payload)
    .switchMap(payload =>
      this.projectService
      .sectionAddBoard(payload)
      .map((data: any) => {
        if (data.ok) {
          return new SectionAddBoardSuccess({
            sectionId: payload.sectionId,
            board: data.projectOutput.sectionsOutput[0].boardsOutput[0].board,
            sectionOpen: payload.sectionOpen
          });
        } else { return new SectionAddBoardFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  SectionAddBoardFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_SECTIONADDBOARD_FAILURE)
  );

  @Effect({ dispatch: false })
  SectionAddBoardSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_SECTIONADDBOARD_SUCCESS)
  );

  @Effect()
  UpdateProjectBoardName: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_UPDATEBOARDNAME)
    .map((action: UpdateProjectBoardName) => action.payload)
    .switchMap(payload =>
      this.projectService
      .updateBoardName(payload)
      .map((data: any) => {
        if (data.ok) {
          return new UpdateProjectBoardNameSuccess({
            boardId: payload.boardId,
            boardOpen: payload.boardOpen,
            name: payload.name
          });
        } else { return new UpdateProjectBoardNameFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  UpdateProjectBoardNameFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATEBOARDNAME_FAILURE)
  );

  @Effect({ dispatch: false })
  UpdateProjectBoardNameSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATEBOARDNAME_SUCCESS)
  );

  @Effect()
  UpdateSectionBoardName: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_UPDATESECTIONBOARDNAME)
    .map((action: UpdateSectionBoardName) => action.payload)
    .switchMap(payload =>
      this.projectService
      .updateSectionBoardName(payload)
      .map((data: any) => {
        if (data.ok) {
          return new UpdateSectionBoardNameSuccess({
            sectionId: payload.sectionId,
            boardId: payload.boardId,
            sectionOpen: payload.sectionOpen,
            boardOpen: payload.boardOpen,
            name: payload.name
          });
        } else { return new UpdateSectionBoardNameFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  UpdateSectionBoardNameFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESECTIONBOARDNAME_FAILURE)
  );

  @Effect({ dispatch: false })
  UpdateSectionBoardNameSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESECTIONBOARDNAME_SUCCESS)
  );

  @Effect()
  VersionAdd: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_ADDVERSION)
    .map((action: VersionAdd) => action.payload)
    .switchMap(payload =>

      this.projectService
      .addVersion(payload)
      .map((data: any) => {
        if (data.ok) { return new VersionAddSuccess(data); } else { return new VersionAddFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  VersionAddFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_ADDVERSION_FAILURE)
  );

  @Effect({ dispatch: false })
  VersionAddSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_ADDBOARD_SUCCESS)
  );

  @Effect()
  VersionDelete: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_DELETEVERSION)
    .map((action: VersionDelete) => action.payload)
    .switchMap(payload =>
      this.projectService
      .deleteVersion(payload)
      .map((data: any) => {
        if (data.ok) { return new VersionDeleteSuccess(data); } else { return new VersionDeleteFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  VersionDeleteFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_DELETEVERISON_FAILURE)
  );

  @Effect({ dispatch: false })
  VersionDeleteSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_DELETEVERSION_SUCCESS)
  );

  @Effect({ dispatch: false })
  CloseBoards: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_CLOSEBOARDS)
  );

  @Effect()
  DeleteSectionBoard: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_DELETESECTIONBOARD)
    .map((action: DeleteSectionBoard) => action.payload)
    .switchMap(payload =>
      this.projectService
      .deleteBoard(payload)
      .map((data: any) => {
        if (data.ok) {
          return new DeleteSectionBoardSuccess({
            sectionId: payload.sectionId,
            boardId: payload.boardId,
            sectionOpen: payload.sectionOpen
          });
        } else { return new DeleteSectionBoardFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  DeleteSectionBoardFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_DELETESECTIONBOARD_FAILURE)
  );

  @Effect({ dispatch: false })
  DeleteSectionBoardSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_DELETESECTIONBOARD_SUCCESS)
  );

  @Effect()
  DeleteProjectBoard: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_DELETEBOARD)
    .map((action: DeleteProjectBoard) => action.payload)
    .switchMap(payload =>
      this.projectService
      .deleteBoard(payload)
      .map((data: any) => {
        if (data.ok) {
          return new DeleteProjectBoardSuccess({
            boardId: payload.boardId
          });
        } else { return new DeleteProjectBoardFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  DeleteProjectBoardFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_DELETEBOARD_FAILURE)
  );

  @Effect({ dispatch: false })
  DeleteProjectBoardSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_DELETEBOARD_SUCCESS)
  );

  @Effect()
  ProjectBoardAddNote: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_BOARDADDNOTE)
    .map((action: ProjectBoardAddNote) => action.payload)
    .switchMap(payload =>
      this.projectService
      .boardAddNote(payload)
      .map((data: any) => {
        if (data.ok) {
          return new ProjectBoardAddNoteSuccess({
            boardId: payload.boardId,
            note: data.projectOutput.boardsOutput[0].notesOutput[0].note,
            boardOpen: payload.boardOpen
          });
        } else { return new ProjectBoardAddNoteFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  ProjectBoardAddNoteFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_BOARDADDNOTE_FAILURE)
  );

  @Effect({ dispatch: false })
  ProjectBoardAddNoteSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_BOARDADDNOTE_SUCCESS)
  );

  @Effect()
  SectionBoardAddNote: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_SECTIONBOARDADDNOTE)
    .map((action: SectionBoardAddNote) => action.payload)
    .switchMap(payload =>
      this.projectService
      .sectionBoardAddNote(payload)
      .map((data: any) => {
        if (data.ok) {
          return new SectionBoardAddNoteSuccess({
            boardId: payload.boardId,
            sectionId: payload.sectionId,
            note: data.projectOutput.sectionsOutput[0].boardsOutput[0].notesOutput[0].note,
            boardOpen: payload.boardOpen,
            sectionOpen: payload.sectionOpen
          });
        } else { return new SectionBoardAddNoteFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  SectionBoardAddNoteFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_SECTIONBOARDADDNOTE_FAILURE)
  );

  @Effect({ dispatch: false })
  SectionBoardAddNoteSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_SECTIONBOARDADDNOTE_SUCCESS)
  );

  @Effect()
  SectionBoardDeleteNote: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_SECTIONBOARDDELETENOTE)
    .map((action: SectionBoardDeleteNote) => action.payload)
    .switchMap(payload =>
      this.projectService
      .deleteNote(payload)
      .map((data: any) => {
        if (data.ok) {
          return new SectionBoardDeleteNoteSuccess({
            boardId: payload.boardId,
            sectionId: payload.sectionId,
            noteId: payload.noteId,
            boardOpen: payload.boardOpen,
            sectionOpen: payload.sectionOpen
          });
        } else { return new SectionBoardDeleteNoteFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  SectionBoardDeleteNoteFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_SECTIONBOARDDELETENOTE_FAILURE)
  );

  @Effect({ dispatch: false })
  SectionBoardDeleteNoteSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_SECTIONBOARDDELETENOTE_SUCCESS)
  );

  @Effect()
  ProjectBoardDeleteNote: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_BOARDDELETENOTE)
    .map((action: ProjectBoardDeleteNote) => action.payload)
    .switchMap(payload =>
      this.projectService
      .deleteNote(payload)
      .map((data: any) => {
        if (data.ok) {
          return new ProjectBoardDeleteNoteSuccess({
            boardId: payload.boardId,
            noteId: payload.noteId,
            boardOpen: payload.boardOpen
          });
        } else { return new ProjectBoardDeleteNoteFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  ProjectBoardDeleteNoteFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_BOARDDELETENOTE_FAILURE)
  );

  @Effect({ dispatch: false })
  ProjectBoardDeleteNoteSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_BOARDDELETENOTE_SUCCESS)
  );

  @Effect()
  ProjectUpdateNoteTitle: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_UPDATENOTETITLE)
    .map((action: ProjectUpdateNoteTitle) => action.payload)
    .switchMap(payload =>
      this.projectService
      .updateNoteTitle(payload)
      .map((data: any) => {
        if (data.ok) {
          return new ProjectUpdateNoteTitleSuccess({
            boardId: payload.boardId,
            noteId: payload.noteId,
            boardOpen: payload.boardOpen,
            title: payload.title
          });
        } else { return new ProjectUpdateNoteTitleFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  ProjectUpdateNoteTitleFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATENOTETITLE_FAILURE)
  );

  @Effect({ dispatch: false })
  ProjectUpdateNoteTitleSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATENOTETITLE_SUCCESS)
  );

  @Effect()
  SectionUpdateNoteTitle: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_SECTIONUPDATENOTETITLE)
    .map((action: SectionUpdateNoteTitle) => action.payload)
    .switchMap(payload =>
      this.projectService
      .sectionUpdateNoteTitle(payload)
      .map((data: any) => {
        if (data.ok) {
          return new SectionUpdateNoteTitleSuccess({
            boardId: payload.boardId,
            sectionId: payload.sectionId,
            noteId: payload.noteId,
            boardOpen: payload.boardOpen,
            sectionOpen: payload.sectionOpen,
            title: payload.title
          });
        } else { return new SectionUpdateNoteTitleFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  SectionUpdateNoteTitleFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_SECTIONUPDATENOTETITLE_FAILURE)
  );

  @Effect({ dispatch: false })
  SectionUpdateNoteTitleSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_SECTIONUPDATENOTETITLE_SUCCESS)
  );

  @Effect()
  ProjectUpdateNoteText: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_UPDATENOTETEXT)
    .map((action: ProjectUpdateNoteText) => action.payload)
    .switchMap(payload =>
      this.projectService
      .updateNoteText(payload)
      .map((data: any) => {
        if (data.ok) {
          return new ProjectUpdateNoteTextSuccess({
            boardId: payload.boardId,
            noteId: payload.noteId,
            boardOpen: payload.boardOpen,
            text: payload.text
          });
        } else { return new ProjectUpdateNoteTextFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  ProjectUpdateNoteTextFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATENOTETEXT_FAILURE)
  );

  @Effect({ dispatch: false })
  ProjectUpdateNoteTextSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATENOTETEXT_SUCCESS)
  );

  @Effect()
  SectionUpdateNoteText: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_SECTIONUPDATENOTETEXT)
    .map((action: SectionUpdateNoteText) => action.payload)
    .switchMap(payload =>
      this.projectService
      .sectionUpdateNoteText(payload)
      .map((data: any) => {
        if (data.ok) {
          return new SectionUpdateNoteTextSuccess({
            boardId: payload.boardId,
            sectionId: payload.sectionId,
            noteId: payload.noteId,
            boardOpen: payload.boardOpen,
            sectionOpen: payload.sectionOpen,
            text: payload.text
          });
        } else { return new SectionUpdateNoteTextFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  SectionUpdateNoteTextFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_SECTIONUPDATENOTETEXT_FAILURE)
  );

  @Effect({ dispatch: false })
  SectionUpdateNoteTextSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_SECTIONUPDATENOTETEXT_SUCCESS)
  );
  @Effect()
  UpdateProjectBoardColor: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_UPDATEBOARDCOLOR)
    .map((action: UpdateProjectBoardColor) => action.payload)
    .switchMap(payload =>
      this.projectService
      .updateBoardColor(payload)
      .map((data: any) => {
        if (data.ok) {
          return new UpdateProjectBoardColorSuccess({
            boardId: payload.boardId,
            boardOpen: payload.boardOpen,
            color: payload.color
          });
        } else { return new UpdateProjectBoardColorFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  UpdateProjectBoardColorFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATEBOARDCOLOR_FAILURE)
  );

  @Effect({ dispatch: false })
  UpdateProjectBoardColorSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATEBOARDCOLOR_SUCCESS)
  );

  @Effect()
  UpdateSectionBoardColor: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_UPDATESECTIONBOARDCOLOR)
    .map((action: UpdateSectionBoardColor) => action.payload)
    .switchMap(payload =>
      this.projectService
      .updateSectionBoardColor(payload)
      .map((data: any) => {
        if (data.ok) {
          return new UpdateSectionBoardColorSuccess({
            sectionId: payload.sectionId,
            boardId: payload.boardId,
            sectionOpen: payload.sectionOpen,
            boardOpen: payload.boardOpen,
            color: payload.color
          });
        } else { return new UpdateSectionBoardColorFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  UpdateSectionBoardColorFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESECTIONBOARDCOLOR_FAILURE)
  );

  @Effect({ dispatch: false })
  UpdateSectionBoardColorSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESECTIONBOARDCOLOR_SUCCESS)
  );

  @Effect()
  UpdateProjectBoardIcon: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_UPDATEBOARDICON)
    .map((action: UpdateProjectBoardIcon) => action.payload)
    .switchMap(payload =>
      this.projectService
      .updateBoardIcon(payload)
      .map((data: any) => {
        if (data.ok) {
          return new UpdateProjectBoardIconSuccess({
            boardId: payload.boardId,
            boardOpen: payload.boardOpen,
            icon: payload.icon
          });
        } else { return new UpdateProjectBoardIconFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  UpdateProjectBoardIconFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATEBOARDICON_FAILURE)
  );

  @Effect({ dispatch: false })
  UpdateProjectBoardIconSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATEBOARDICON_SUCCESS)
  );

  @Effect()
  UpdateSectionBoardIcon: Observable < any > = this.actions
    .ofType(ProjectActionTypes.PROJECT_UPDATESECTIONBOARDICON)
    .map((action: UpdateSectionBoardIcon) => action.payload)
    .switchMap(payload =>
      this.projectService
      .updateSectionBoardIcon(payload)
      .map((data: any) => {
        if (data.ok) {
          return new UpdateSectionBoardIconSuccess({
            sectionId: payload.sectionId,
            boardId: payload.boardId,
            sectionOpen: payload.sectionOpen,
            boardOpen: payload.boardOpen,
            icon: payload.icon
          });
        } else { return new UpdateSectionBoardIconFailure({ error: data.error }); }
      }));

  @Effect({ dispatch: false })
  UpdateSectionBoardIconFailure: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESECTIONBOARDICON_FAILURE)
  );

  @Effect({ dispatch: false })
  UpdateSectionBoardIconSuccess: Observable < any > = this.actions.pipe(
    ofType(ProjectActionTypes.PROJECT_UPDATESECTIONBOARDICON_SUCCESS)
  );
  constructor(
    private actions: Actions,
    private projectService: ProjectService
  ) {}
}
