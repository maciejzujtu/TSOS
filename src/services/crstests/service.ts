import type { RequestExecutor } from '@/core/requester'
import type { SuccessResponse } from '@/types/common'
import { crstestsEndpoints } from '@/services/crstests/endpoints'
import type { CreatedTestNode, CrstestsAllUserGradesOptions, CrstestsAllUserPointsOptions, CrstestsChangeFolderNodePermissionsOptions, CrstestsChangeFolderNodePropertiesOptions, CrstestsChangeGradeNodePermissionsOptions, CrstestsChangeGradeNodePropertiesOptions, CrstestsChangeRootNodePermissionsOptions, CrstestsChangeRootNodePropertiesOptions, CrstestsChangeTaskNodePermissionsOptions, CrstestsChangeTaskNodePropertiesOptions, CrstestsConnectTemplateToCourseEditionOptions, CrstestsCourseTestOptions, CrstestsCourseTestResult, CrstestsCreateFolderNodeOptions, CrstestsCreateGradeNodeOptions, CrstestsCreateRootNodeOptions, CrstestsCreateTaskNodeOptions, CrstestsDeleteSubtreeOptions, CrstestsDuplicateSubtreeOptions, CrstestsDuplicateTreeOptions, CrstestsExamineeOptions, CrstestsFolderNodeDetailsOptions, CrstestsFolderNodeDetailsResult, CrstestsFolderNodeOptions, CrstestsFolderNodeResult, CrstestsGradeNodeDetailsOptions, CrstestsGradeNodeDetailsResult, CrstestsGradeNodeOptions, CrstestsGradeNodeResult, CrstestsGroupsOptions, CrstestsLecturer2Options, CrstestsLecturerOptions, CrstestsLecturerResult, CrstestsMoveNodeOptions, CrstestsNode2Options, CrstestsNode2Result, CrstestsNodeGradesOptions, CrstestsNodeOptions, CrstestsNodePointsOptions, CrstestsNodeStatsOptions, CrstestsNodeStatsResult, CrstestsParticipant2Options, CrstestsParticipantOptions, CrstestsParticipantResult, CrstestsPublicTemplatesOptions, CrstestsRootNodeOptions, CrstestsRootNodeResult, CrstestsRootNodesOptions, CrstestsStudentGradeOptions, CrstestsStudentGradeResult, CrstestsStudentPointOptions, CrstestsStudentPointResult, CrstestsSubscribeOptions, CrstestsTaskNodeDetailsOptions, CrstestsTaskNodeDetailsResult, CrstestsTaskNodeOptions, CrstestsTaskNodeResult, CrstestsUnsubscribeOptions, CrstestsUpdateGradesOptions, CrstestsUpdatePointsOptions, CrstestsUserGradeModifiedOptions, CrstestsUserGradeOptions, CrstestsUserGradesModifiedOptions, CrstestsUserGradesOptions, CrstestsUserPointModifiedOptions, CrstestsUserPointOptions, CrstestsUserPointsModifiedOptions, CrstestsUserPointsOptions } from '@/services/crstests/types'

export class CrstestsService {
    public constructor(private readonly request: RequestExecutor) {}

    /** Get grades of a student. @beta */
    public async getAllUserGrades(options: CrstestsAllUserGradesOptions): Promise<Record<string, unknown>[]> {
        return await this.request.request(crstestsEndpoints.allUserGrades, {
            params: {
                node_ids: options.nodeIds,
            },
            token: options.accessToken,
        })
    }

    /** Get points of a student. @beta */
    public async getAllUserPoints(options: CrstestsAllUserPointsOptions): Promise<Record<string, unknown>[]> {
        return await this.request.request(crstestsEndpoints.allUserPoints, {
            params: {
                node_ids: options.nodeIds,
            },
            token: options.accessToken,
        })
    }

    /** Change FolderNode permissions. @beta */
    public async changeFolderNodePermissions(options: CrstestsChangeFolderNodePermissionsOptions): Promise<SuccessResponse> {
        return await this.request.request(crstestsEndpoints.changeFolderNodePermissions, {
            params: {
                node_id: options.nodeId,
                set: options.set,
                remove_from_subtree: options.removeFromSubtree,
            },
            token: options.accessToken,
        })
    }

    /** Change properties of a FolderNode. @beta */
    public async changeFolderNodeProperties(options: CrstestsChangeFolderNodePropertiesOptions): Promise<SuccessResponse> {
        return await this.request.request(crstestsEndpoints.changeFolderNodeProperties, {
            params: {
                node_id: options.nodeId,
                name_pl: options.namePl,
                name_en: options.nameEn,
                results_visible_to_students: options.resultsVisibleToStudents,
                rules_visible_to_students: options.rulesVisibleToStudents,
                description_pl: options.descriptionPl,
                description_en: options.descriptionEn,
            },
            token: options.accessToken,
        })
    }

    /** Change GradeNode permissions. @beta */
    public async changeGradeNodePermissions(options: CrstestsChangeGradeNodePermissionsOptions): Promise<SuccessResponse> {
        return await this.request.request(crstestsEndpoints.changeGradeNodePermissions, {
            params: {
                node_id: options.nodeId,
                set: options.set,
                remove_from_subtree: options.removeFromSubtree,
            },
            token: options.accessToken,
        })
    }

    /** Change properties of a GradeNode. @beta */
    public async changeGradeNodeProperties(options: CrstestsChangeGradeNodePropertiesOptions): Promise<SuccessResponse> {
        return await this.request.request(crstestsEndpoints.changeGradeNodeProperties, {
            params: {
                node_id: options.nodeId,
                name_pl: options.namePl,
                name_en: options.nameEn,
                results_visible_to_students: options.resultsVisibleToStudents,
                rules_visible_to_students: options.rulesVisibleToStudents,
                algorithm: options.algorithm,
                variables: options.variables,
                algorithm_description_pl: options.algorithmDescriptionPl,
                algorithm_description_en: options.algorithmDescriptionEn,
                dependencies: options.dependencies,
            },
            token: options.accessToken,
        })
    }

    /** Change RootNode permissions. @beta */
    public async changeRootNodePermissions(options: CrstestsChangeRootNodePermissionsOptions): Promise<SuccessResponse> {
        return await this.request.request(crstestsEndpoints.changeRootNodePermissions, {
            params: {
                node_id: options.nodeId,
                set: options.set,
                remove_from_subtree: options.removeFromSubtree,
            },
            token: options.accessToken,
        })
    }

    /** Change properties of a RootNode. @beta */
    public async changeRootNodeProperties(options: CrstestsChangeRootNodePropertiesOptions): Promise<SuccessResponse> {
        return await this.request.request(crstestsEndpoints.changeRootNodeProperties, {
            params: {
                node_id: options.nodeId,
                name_pl: options.namePl,
                name_en: options.nameEn,
                results_visible_to_students: options.resultsVisibleToStudents,
                rules_visible_to_students: options.rulesVisibleToStudents,
                description_pl: options.descriptionPl,
                description_en: options.descriptionEn,
                public: options.public,
                limit_to_groups: options.limitToGroups,
            },
            token: options.accessToken,
        })
    }

    /** Change TaskNode permissions. @beta */
    public async changeTaskNodePermissions(options: CrstestsChangeTaskNodePermissionsOptions): Promise<SuccessResponse> {
        return await this.request.request(crstestsEndpoints.changeTaskNodePermissions, {
            params: {
                node_id: options.nodeId,
                set: options.set,
                remove_from_subtree: options.removeFromSubtree,
            },
            token: options.accessToken,
        })
    }

    /** Change properties of a TaskNode. @beta */
    public async changeTaskNodeProperties(options: CrstestsChangeTaskNodePropertiesOptions): Promise<SuccessResponse> {
        return await this.request.request(crstestsEndpoints.changeTaskNodeProperties, {
            params: {
                node_id: options.nodeId,
                name_pl: options.namePl,
                name_en: options.nameEn,
                results_visible_to_students: options.resultsVisibleToStudents,
                rules_visible_to_students: options.rulesVisibleToStudents,
                algorithm: options.algorithm,
                variables: options.variables,
                algorithm_description_pl: options.algorithmDescriptionPl,
                algorithm_description_en: options.algorithmDescriptionEn,
                dependencies: options.dependencies,
                points_precision: options.pointsPrecision,
                points_min: options.pointsMin,
                points_max: options.pointsMax,
            },
            token: options.accessToken,
        })
    }

    /** Connect a template to a course edition. @beta */
    public async connectTemplateToCourseEdition(options: CrstestsConnectTemplateToCourseEditionOptions): Promise<SuccessResponse> {
        return await this.request.request(crstestsEndpoints.connectTemplateToCourseEdition, {
            params: {
                root_id: options.rootId,
                course_id: options.courseId,
                term_id: options.termId,
            },
            token: options.accessToken,
        })
    }

    /** Get informations about course test */
    public async getCourseTest(options: CrstestsCourseTestOptions): Promise<CrstestsCourseTestResult> {
        return await this.request.request(crstestsEndpoints.courseTest, {
            params: {
                id: options.id,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Create a FolderNode @beta */
    public async createFolderNode(options: CrstestsCreateFolderNodeOptions): Promise<CreatedTestNode> {
        return await this.request.request(crstestsEndpoints.createFolderNode, {
            params: {
                parent_id: options.parentId,
                name_pl: options.namePl,
                name_en: options.nameEn,
                order: options.order,
            },
            token: options.accessToken,
        })
    }

    /** Creates a GradeNode @beta */
    public async createGradeNode(options: CrstestsCreateGradeNodeOptions): Promise<CreatedTestNode> {
        return await this.request.request(crstestsEndpoints.createGradeNode, {
            params: {
                parent_id: options.parentId,
                grade_type: options.gradeType,
                name_pl: options.namePl,
                name_en: options.nameEn,
                order: options.order,
            },
            token: options.accessToken,
        })
    }

    /** Create a RootNode @beta */
    public async createRootNode(options: CrstestsCreateRootNodeOptions = {}): Promise<CreatedTestNode> {
        return await this.request.request(crstestsEndpoints.createRootNode, {
            params: {
                name_pl: options.namePl,
                name_en: options.nameEn,
                description_pl: options.descriptionPl,
                description_en: options.descriptionEn,
            },
            token: options.accessToken,
        })
    }

    /** Create a TaskNode. @beta */
    public async createTaskNode(options: CrstestsCreateTaskNodeOptions): Promise<CreatedTestNode> {
        return await this.request.request(crstestsEndpoints.createTaskNode, {
            params: {
                parent_id: options.parentId,
                name_pl: options.namePl,
                name_en: options.nameEn,
                order: options.order,
                points_min: options.pointsMin,
                points_max: options.pointsMax,
                points_precision: options.pointsPrecision,
            },
            token: options.accessToken,
        })
    }

    /** Delete a subtree of test. @beta */
    public async deleteSubtree(options: CrstestsDeleteSubtreeOptions): Promise<SuccessResponse> {
        return await this.request.request(crstestsEndpoints.deleteSubtree, {
            params: {
                node_id: options.nodeId,
            },
            token: options.accessToken,
        })
    }

    /** Duplicate a subtree. @beta */
    public async duplicateSubtree(options: CrstestsDuplicateSubtreeOptions): Promise<CreatedTestNode> {
        return await this.request.request(crstestsEndpoints.duplicateSubtree, {
            params: {
                node_id: options.nodeId,
                name_pl: options.namePl,
                name_en: options.nameEn,
            },
            token: options.accessToken,
        })
    }

    /** Duplicate a test or a template. @beta */
    public async duplicateTree(options: CrstestsDuplicateTreeOptions): Promise<CreatedTestNode> {
        return await this.request.request(crstestsEndpoints.duplicateTree, {
            params: {
                root_id: options.rootId,
                name_pl: options.namePl,
                name_en: options.nameEn,
            },
            token: options.accessToken,
        })
    }

    /** common tests */
    public async getExaminee(options: CrstestsExamineeOptions): Promise<Record<string, unknown>[]> {
        return await this.request.request(crstestsEndpoints.examinee, {
            params: {
                student_id: options.studentId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get a FolderNode. @beta */
    public async getFolderNode(options: CrstestsFolderNodeOptions): Promise<CrstestsFolderNodeResult> {
        return await this.request.request(crstestsEndpoints.folderNode, {
            params: {
                node_id: options.nodeId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get folder node details */
    public async getFolderNodeDetails(options: CrstestsFolderNodeDetailsOptions): Promise<CrstestsFolderNodeDetailsResult> {
        return await this.request.request(crstestsEndpoints.folderNodeDetails, {
            params: {
                id: options.id,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get a GradeNode. @beta */
    public async getGradeNode(options: CrstestsGradeNodeOptions): Promise<CrstestsGradeNodeResult> {
        return await this.request.request(crstestsEndpoints.gradeNode, {
            params: {
                node_id: options.nodeId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Details of a grade node */
    public async getGradeNodeDetails(options: CrstestsGradeNodeDetailsOptions): Promise<CrstestsGradeNodeDetailsResult> {
        return await this.request.request(crstestsEndpoints.gradeNodeDetails, {
            params: {
                id: options.id,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get groups of a test. @beta */
    public async getGroups(options: CrstestsGroupsOptions): Promise<Record<string, unknown>[]> {
        return await this.request.request(crstestsEndpoints.groups, {
            params: {
                root_id: options.rootId,
            },
            token: options.accessToken,
        })
    }

    /** Get lecturer's tests. @beta */
    public async getLecturer(options: CrstestsLecturerOptions = {}): Promise<CrstestsLecturerResult> {
        return await this.request.request(crstestsEndpoints.lecturer, {
            params: {
            },
            token: options.accessToken,
        })
    }

    /** Get student's tests */
    public async getLecturer2(options: CrstestsLecturer2Options = {}): Promise<Record<string, unknown>[]> {
        return await this.request.request(crstestsEndpoints.lecturer2, {
            params: {
                fields: options.fields,
                active_terms_only: options.activeTermsOnly,
            },
            token: options.accessToken,
        })
    }

    /** Move a node. @beta */
    public async moveNode(options: CrstestsMoveNodeOptions): Promise<SuccessResponse> {
        return await this.request.request(crstestsEndpoints.moveNode, {
            params: {
                node_id: options.nodeId,
                new_parent_id: options.newParentId,
                new_order: options.newOrder,
            },
            token: options.accessToken,
        })
    }

    /** Get nodes @beta @deprecated */
    public async getNode(options: CrstestsNodeOptions): Promise<Record<string, unknown>> {
        return await this.request.request(crstestsEndpoints.node, {
            params: {
                node_id: options.nodeId,
                recursive: options.recursive,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get grades given in some node. @beta */
    public async getNodeGrades(options: CrstestsNodeGradesOptions): Promise<Record<string, unknown>[]> {
        return await this.request.request(crstestsEndpoints.nodeGrades, {
            params: {
                node_id: options.nodeId,
            },
            token: options.accessToken,
        })
    }

    /** Get points given in some node. @beta */
    public async getNodePoints(options: CrstestsNodePointsOptions): Promise<Record<string, unknown>[]> {
        return await this.request.request(crstestsEndpoints.nodePoints, {
            params: {
                node_id: options.nodeId,
            },
            token: options.accessToken,
        })
    }

    /** Node statistics */
    public async getNodeStats(options: CrstestsNodeStatsOptions): Promise<CrstestsNodeStatsResult> {
        return await this.request.request(crstestsEndpoints.nodeStats, {
            params: {
                node_id: options.nodeId,
            },
            token: options.accessToken,
        })
    }

    /** Get nodes */
    public async getNode2(options: CrstestsNode2Options): Promise<CrstestsNode2Result> {
        return await this.request.request(crstestsEndpoints.node2, {
            params: {
                node_id: options.nodeId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get student's tests. @beta */
    public async getParticipant(options: CrstestsParticipantOptions = {}): Promise<CrstestsParticipantResult> {
        return await this.request.request(crstestsEndpoints.participant, {
            params: {
            },
            token: options.accessToken,
        })
    }

    /** Get student's tests */
    public async getParticipant2(options: CrstestsParticipant2Options = {}): Promise<Record<string, unknown>[]> {
        return await this.request.request(crstestsEndpoints.participant2, {
            params: {
                fields: options.fields,
                active_terms_only: options.activeTermsOnly,
            },
            token: options.accessToken,
        })
    }

    /** Get public templates templates. @beta */
    public async getPublicTemplates(options: CrstestsPublicTemplatesOptions = {}): Promise<Record<string, unknown>[]> {
        return await this.request.request(crstestsEndpoints.publicTemplates, {
            params: {
            },
            token: options.accessToken,
        })
    }

    /** Get description of a RootNode. @beta */
    public async getRootNode(options: CrstestsRootNodeOptions): Promise<CrstestsRootNodeResult> {
        return await this.request.request(crstestsEndpoints.rootNode, {
            params: {
                node_id: options.nodeId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get multiple RootNodes. @beta */
    public async getRootNodes(options: CrstestsRootNodesOptions): Promise<Record<string, unknown>> {
        return await this.request.request(crstestsEndpoints.rootNodes, {
            params: {
                node_ids: options.nodeIds,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get student's grade for a single node. */
    public async getStudentGrade(options: CrstestsStudentGradeOptions): Promise<CrstestsStudentGradeResult> {
        return await this.request.request(crstestsEndpoints.studentGrade, {
            params: {
                node_id: options.nodeId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Get points which token issuer got in node specified by node_id parameter */
    public async getStudentPoint(options: CrstestsStudentPointOptions): Promise<CrstestsStudentPointResult> {
        return await this.request.request(crstestsEndpoints.studentPoint, {
            params: {
                node_id: options.nodeId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Grant ReadPerm. @beta */
    public async subscribe(options: CrstestsSubscribeOptions): Promise<SuccessResponse> {
        return await this.request.request(crstestsEndpoints.subscribe, {
            params: {
                node_id: options.nodeId,
            },
            token: options.accessToken,
        })
    }

    /** Get a TaskNode. @beta */
    public async getTaskNode(options: CrstestsTaskNodeOptions): Promise<CrstestsTaskNodeResult> {
        return await this.request.request(crstestsEndpoints.taskNode, {
            params: {
                node_id: options.nodeId,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Details of a task node */
    public async getTaskNodeDetails(options: CrstestsTaskNodeDetailsOptions): Promise<CrstestsTaskNodeDetailsResult> {
        return await this.request.request(crstestsEndpoints.taskNodeDetails, {
            params: {
                id: options.id,
                fields: options.fields,
            },
            token: options.accessToken,
        })
    }

    /** Remove ReadPerm. @beta */
    public async unsubscribe(options: CrstestsUnsubscribeOptions): Promise<SuccessResponse> {
        return await this.request.request(crstestsEndpoints.unsubscribe, {
            params: {
                node_id: options.nodeId,
            },
            token: options.accessToken,
        })
    }

    /** Give grades to students. @beta */
    public async updateGrades(options: CrstestsUpdateGradesOptions): Promise<SuccessResponse> {
        return await this.request.request(crstestsEndpoints.updateGrades, {
            params: {
                node_id: options.nodeId,
                new_grades: options.newGrades,
            },
            token: options.accessToken,
        })
    }

    /** Give points to students. @beta */
    public async updatePoints(options: CrstestsUpdatePointsOptions): Promise<SuccessResponse> {
        return await this.request.request(crstestsEndpoints.updatePoints, {
            params: {
                new_points: options.newPoints,
                node_id: options.nodeId,
            },
            token: options.accessToken,
        })
    }

    /** Get student's grade for a single node. @beta */
    public async getUserGrade(options: CrstestsUserGradeOptions): Promise<Record<string, unknown>> {
        return await this.request.request(crstestsEndpoints.userGrade, {
            params: {
                node_id: options.nodeId,
            },
            token: options.accessToken,
        })
    }

    /** Notify about user's course test grade modification. @beta */
    public async userGradeModified(options: CrstestsUserGradeModifiedOptions): Promise<Record<string, never>> {
        return await this.request.request(crstestsEndpoints.userGradeModified, {
            params: {
                operation: options.operation,
                node_id: options.nodeId,
                related_user_ids: options.relatedUserIds,
            },
            token: options.accessToken,
        })
    }

    /** Get student's grades for some nodes. @beta */
    public async getUserGrades(options: CrstestsUserGradesOptions): Promise<Record<string, unknown>[]> {
        return await this.request.request(crstestsEndpoints.userGrades, {
            params: {
                node_ids: options.nodeIds,
            },
            token: options.accessToken,
        })
    }

    /** Notify USOS API that crstests grades were modified. @beta */
    public async userGradesModified(options: CrstestsUserGradesModifiedOptions): Promise<Record<string, never>> {
        return await this.request.request(crstestsEndpoints.userGradesModified, {
            params: {
                user_grade_modified_params: options.userGradeModifiedParams === undefined ? undefined : JSON.stringify(options.userGradeModifiedParams),
            },
            token: options.accessToken,
        })
    }

    /** Get points of a student for a single node. @beta */
    public async getUserPoint(options: CrstestsUserPointOptions): Promise<Record<string, unknown>> {
        return await this.request.request(crstestsEndpoints.userPoint, {
            params: {
                node_id: options.nodeId,
            },
            token: options.accessToken,
        })
    }

    /** Notify about user's course test points modification. @beta */
    public async userPointModified(options: CrstestsUserPointModifiedOptions): Promise<Record<string, never>> {
        return await this.request.request(crstestsEndpoints.userPointModified, {
            params: {
                operation: options.operation,
                node_id: options.nodeId,
                related_user_ids: options.relatedUserIds,
            },
            token: options.accessToken,
        })
    }

    /** Get points of a student. @beta */
    public async getUserPoints(options: CrstestsUserPointsOptions): Promise<Record<string, unknown>[]> {
        return await this.request.request(crstestsEndpoints.userPoints, {
            params: {
                node_ids: options.nodeIds,
            },
            token: options.accessToken,
        })
    }

    /** Notify USOS API that crstests points were modified. @beta */
    public async userPointsModified(options: CrstestsUserPointsModifiedOptions): Promise<Record<string, never>> {
        return await this.request.request(crstestsEndpoints.userPointsModified, {
            params: {
                user_point_modified_params: options.userPointModifiedParams === undefined ? undefined : JSON.stringify(options.userPointModifiedParams),
            },
            token: options.accessToken,
        })
    }

}
