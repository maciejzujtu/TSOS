import type { EndpointDefinition } from '@/core/endpoint'
import type { SuccessResponse } from '@/types/common'
import type { CreatedTestNode, CrstestsAllUserGradesParams, CrstestsAllUserPointsParams, CrstestsChangeFolderNodePermissionsParams, CrstestsChangeFolderNodePropertiesParams, CrstestsChangeGradeNodePermissionsParams, CrstestsChangeGradeNodePropertiesParams, CrstestsChangeRootNodePermissionsParams, CrstestsChangeRootNodePropertiesParams, CrstestsChangeTaskNodePermissionsParams, CrstestsChangeTaskNodePropertiesParams, CrstestsConnectTemplateToCourseEditionParams, CrstestsCourseTestParams, CrstestsCourseTestResult, CrstestsCreateFolderNodeParams, CrstestsCreateGradeNodeParams, CrstestsCreateRootNodeParams, CrstestsCreateTaskNodeParams, CrstestsDeleteSubtreeParams, CrstestsDuplicateSubtreeParams, CrstestsDuplicateTreeParams, CrstestsExamineeParams, CrstestsFolderNodeDetailsParams, CrstestsFolderNodeDetailsResult, CrstestsFolderNodeParams, CrstestsFolderNodeResult, CrstestsGradeNodeDetailsParams, CrstestsGradeNodeDetailsResult, CrstestsGradeNodeParams, CrstestsGradeNodeResult, CrstestsGroupsParams, CrstestsLecturer2Params, CrstestsLecturerParams, CrstestsLecturerResult, CrstestsMoveNodeParams, CrstestsNode2Params, CrstestsNode2Result, CrstestsNodeGradesParams, CrstestsNodeParams, CrstestsNodePointsParams, CrstestsNodeStatsParams, CrstestsNodeStatsResult, CrstestsParticipant2Params, CrstestsParticipantParams, CrstestsParticipantResult, CrstestsPublicTemplatesParams, CrstestsRootNodeParams, CrstestsRootNodeResult, CrstestsRootNodesParams, CrstestsStudentGradeParams, CrstestsStudentGradeResult, CrstestsStudentPointParams, CrstestsStudentPointResult, CrstestsSubscribeParams, CrstestsTaskNodeDetailsParams, CrstestsTaskNodeDetailsResult, CrstestsTaskNodeParams, CrstestsTaskNodeResult, CrstestsUnsubscribeParams, CrstestsUpdateGradesParams, CrstestsUpdatePointsParams, CrstestsUserGradeModifiedParams, CrstestsUserGradeParams, CrstestsUserGradesModifiedParams, CrstestsUserGradesParams, CrstestsUserPointModifiedParams, CrstestsUserPointParams, CrstestsUserPointsModifiedParams, CrstestsUserPointsParams } from '@/services/crstests/types'

export interface CrstestsEndpoints {
    allUserGrades: EndpointDefinition<CrstestsAllUserGradesParams, Record<string, unknown>[]>
    allUserPoints: EndpointDefinition<CrstestsAllUserPointsParams, Record<string, unknown>[]>
    changeFolderNodePermissions: EndpointDefinition<CrstestsChangeFolderNodePermissionsParams, SuccessResponse>
    changeFolderNodeProperties: EndpointDefinition<CrstestsChangeFolderNodePropertiesParams, SuccessResponse>
    changeGradeNodePermissions: EndpointDefinition<CrstestsChangeGradeNodePermissionsParams, SuccessResponse>
    changeGradeNodeProperties: EndpointDefinition<CrstestsChangeGradeNodePropertiesParams, SuccessResponse>
    changeRootNodePermissions: EndpointDefinition<CrstestsChangeRootNodePermissionsParams, SuccessResponse>
    changeRootNodeProperties: EndpointDefinition<CrstestsChangeRootNodePropertiesParams, SuccessResponse>
    changeTaskNodePermissions: EndpointDefinition<CrstestsChangeTaskNodePermissionsParams, SuccessResponse>
    changeTaskNodeProperties: EndpointDefinition<CrstestsChangeTaskNodePropertiesParams, SuccessResponse>
    connectTemplateToCourseEdition: EndpointDefinition<CrstestsConnectTemplateToCourseEditionParams, SuccessResponse>
    courseTest: EndpointDefinition<CrstestsCourseTestParams, CrstestsCourseTestResult>
    createFolderNode: EndpointDefinition<CrstestsCreateFolderNodeParams, CreatedTestNode>
    createGradeNode: EndpointDefinition<CrstestsCreateGradeNodeParams, CreatedTestNode>
    createRootNode: EndpointDefinition<CrstestsCreateRootNodeParams, CreatedTestNode>
    createTaskNode: EndpointDefinition<CrstestsCreateTaskNodeParams, CreatedTestNode>
    deleteSubtree: EndpointDefinition<CrstestsDeleteSubtreeParams, SuccessResponse>
    duplicateSubtree: EndpointDefinition<CrstestsDuplicateSubtreeParams, CreatedTestNode>
    duplicateTree: EndpointDefinition<CrstestsDuplicateTreeParams, CreatedTestNode>
    examinee: EndpointDefinition<CrstestsExamineeParams, Record<string, unknown>[]>
    folderNode: EndpointDefinition<CrstestsFolderNodeParams, CrstestsFolderNodeResult>
    folderNodeDetails: EndpointDefinition<CrstestsFolderNodeDetailsParams, CrstestsFolderNodeDetailsResult>
    gradeNode: EndpointDefinition<CrstestsGradeNodeParams, CrstestsGradeNodeResult>
    gradeNodeDetails: EndpointDefinition<CrstestsGradeNodeDetailsParams, CrstestsGradeNodeDetailsResult>
    groups: EndpointDefinition<CrstestsGroupsParams, Record<string, unknown>[]>
    lecturer: EndpointDefinition<CrstestsLecturerParams, CrstestsLecturerResult>
    lecturer2: EndpointDefinition<CrstestsLecturer2Params, Record<string, unknown>[]>
    moveNode: EndpointDefinition<CrstestsMoveNodeParams, SuccessResponse>
    node: EndpointDefinition<CrstestsNodeParams, Record<string, unknown>>
    nodeGrades: EndpointDefinition<CrstestsNodeGradesParams, Record<string, unknown>[]>
    nodePoints: EndpointDefinition<CrstestsNodePointsParams, Record<string, unknown>[]>
    nodeStats: EndpointDefinition<CrstestsNodeStatsParams, CrstestsNodeStatsResult>
    node2: EndpointDefinition<CrstestsNode2Params, CrstestsNode2Result>
    participant: EndpointDefinition<CrstestsParticipantParams, CrstestsParticipantResult>
    participant2: EndpointDefinition<CrstestsParticipant2Params, Record<string, unknown>[]>
    publicTemplates: EndpointDefinition<CrstestsPublicTemplatesParams, Record<string, unknown>[]>
    rootNode: EndpointDefinition<CrstestsRootNodeParams, CrstestsRootNodeResult>
    rootNodes: EndpointDefinition<CrstestsRootNodesParams, Record<string, unknown>>
    studentGrade: EndpointDefinition<CrstestsStudentGradeParams, CrstestsStudentGradeResult>
    studentPoint: EndpointDefinition<CrstestsStudentPointParams, CrstestsStudentPointResult>
    subscribe: EndpointDefinition<CrstestsSubscribeParams, SuccessResponse>
    taskNode: EndpointDefinition<CrstestsTaskNodeParams, CrstestsTaskNodeResult>
    taskNodeDetails: EndpointDefinition<CrstestsTaskNodeDetailsParams, CrstestsTaskNodeDetailsResult>
    unsubscribe: EndpointDefinition<CrstestsUnsubscribeParams, SuccessResponse>
    updateGrades: EndpointDefinition<CrstestsUpdateGradesParams, SuccessResponse>
    updatePoints: EndpointDefinition<CrstestsUpdatePointsParams, SuccessResponse>
    userGrade: EndpointDefinition<CrstestsUserGradeParams, Record<string, unknown>>
    userGradeModified: EndpointDefinition<CrstestsUserGradeModifiedParams, Record<string, never>>
    userGrades: EndpointDefinition<CrstestsUserGradesParams, Record<string, unknown>[]>
    userGradesModified: EndpointDefinition<CrstestsUserGradesModifiedParams, Record<string, never>>
    userPoint: EndpointDefinition<CrstestsUserPointParams, Record<string, unknown>>
    userPointModified: EndpointDefinition<CrstestsUserPointModifiedParams, Record<string, never>>
    userPoints: EndpointDefinition<CrstestsUserPointsParams, Record<string, unknown>[]>
    userPointsModified: EndpointDefinition<CrstestsUserPointsModifiedParams, Record<string, never>>
}

export const crstestsEndpoints: CrstestsEndpoints = {
    /** Get grades of a student. @beta  */
    allUserGrades: {
        path: "services/crstests/all_user_grades",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    /** Get points of a student. @beta  */
    allUserPoints: {
        path: "services/crstests/all_user_points",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    /** Change FolderNode permissions. @beta  */
    changeFolderNodePermissions: {
        path: "services/crstests/change_folder_node_permissions",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["staff_perspective","crstests"],
        },
    },
    /** Change properties of a FolderNode. @beta  */
    changeFolderNodeProperties: {
        path: "services/crstests/change_folder_node_properties",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["staff_perspective","crstests"],
        },
    },
    /** Change GradeNode permissions. @beta  */
    changeGradeNodePermissions: {
        path: "services/crstests/change_grade_node_permissions",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["staff_perspective","crstests"],
        },
    },
    /** Change properties of a GradeNode. @beta  */
    changeGradeNodeProperties: {
        path: "services/crstests/change_grade_node_properties",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["staff_perspective","crstests"],
        },
    },
    /** Change RootNode permissions. @beta  */
    changeRootNodePermissions: {
        path: "services/crstests/change_root_node_permissions",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["staff_perspective","crstests"],
        },
    },
    /** Change properties of a RootNode. @beta  */
    changeRootNodeProperties: {
        path: "services/crstests/change_root_node_properties",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["staff_perspective","crstests"],
        },
    },
    /** Change TaskNode permissions. @beta  */
    changeTaskNodePermissions: {
        path: "services/crstests/change_task_node_permissions",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["staff_perspective","crstests"],
        },
    },
    /** Change properties of a TaskNode. @beta  */
    changeTaskNodeProperties: {
        path: "services/crstests/change_task_node_properties",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["staff_perspective","crstests"],
        },
    },
    /** Connect a template to a course edition. @beta  */
    connectTemplateToCourseEdition: {
        path: "services/crstests/connect_template_to_course_edition",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    /** Get informations about course test   */
    courseTest: {
        path: "services/crstests/course_test",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    /** Create a FolderNode @beta  */
    createFolderNode: {
        path: "services/crstests/create_folder_node",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    /** Creates a GradeNode @beta  */
    createGradeNode: {
        path: "services/crstests/create_grade_node",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    /** Create a RootNode @beta  */
    createRootNode: {
        path: "services/crstests/create_root_node",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    /** Create a TaskNode. @beta  */
    createTaskNode: {
        path: "services/crstests/create_task_node",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    /** Delete a subtree of test. @beta  */
    deleteSubtree: {
        path: "services/crstests/delete_subtree",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    /** Duplicate a subtree. @beta  */
    duplicateSubtree: {
        path: "services/crstests/duplicate_subtree",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    /** Duplicate a test or a template. @beta  */
    duplicateTree: {
        path: "services/crstests/duplicate_tree",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    /** common tests   */
    examinee: {
        path: "services/crstests/examinee",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["staff_perspective","crstests"],
        },
    },
    /** Get a FolderNode. @beta  */
    folderNode: {
        path: "services/crstests/folder_node",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["crstests"],
        },
    },
    /** Get folder node details   */
    folderNodeDetails: {
        path: "services/crstests/folder_node_details",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    /** Get a GradeNode. @beta  */
    gradeNode: {
        path: "services/crstests/grade_node",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["crstests","grades"],
        },
    },
    /** Details of a grade node   */
    gradeNodeDetails: {
        path: "services/crstests/grade_node_details",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    /** Get groups of a test. @beta  */
    groups: {
        path: "services/crstests/groups",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
        },
    },
    /** Get lecturer's tests. @beta  */
    lecturer: {
        path: "services/crstests/lecturer",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["staff_perspective","crstests"],
        },
    },
    /** Get student's tests   */
    lecturer2: {
        path: "services/crstests/lecturer2",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["crstests"],
        },
    },
    /** Move a node. @beta  */
    moveNode: {
        path: "services/crstests/move_node",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    /** Get nodes @beta @deprecated */
    node: {
        path: "services/crstests/node",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "optional",
            sslRequired: false,
        },
    },
    /** Get grades given in some node. @beta  */
    nodeGrades: {
        path: "services/crstests/node_grades",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "ignored",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    /** Get points given in some node. @beta  */
    nodePoints: {
        path: "services/crstests/node_points",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "ignored",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    /** Node statistics   */
    nodeStats: {
        path: "services/crstests/node_stats",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["crstests"],
        },
    },
    /** Get nodes   */
    node2: {
        path: "services/crstests/node2",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    /** Get student's tests. @beta  */
    participant: {
        path: "services/crstests/participant",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["crstests"],
        },
    },
    /** Get student's tests   */
    participant2: {
        path: "services/crstests/participant2",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["crstests"],
        },
    },
    /** Get public templates templates. @beta  */
    publicTemplates: {
        path: "services/crstests/public_templates",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "ignored",
            sslRequired: false,
        },
    },
    /** Get description of a RootNode. @beta  */
    rootNode: {
        path: "services/crstests/root_node",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["crstests"],
        },
    },
    /** Get multiple RootNodes. @beta  */
    rootNodes: {
        path: "services/crstests/root_nodes",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["crstests"],
        },
    },
    /** Get student's grade for a single node.   */
    studentGrade: {
        path: "services/crstests/student_grade",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["crstests"],
        },
    },
    /** Get points which token issuer got in node specified by node_id parameter   */
    studentPoint: {
        path: "services/crstests/student_point",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: true,
            scopes: ["crstests"],
        },
    },
    /** Grant ReadPerm. @beta  */
    subscribe: {
        path: "services/crstests/subscribe",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
        },
    },
    /** Get a TaskNode. @beta  */
    taskNode: {
        path: "services/crstests/task_node",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["crstests"],
        },
    },
    /** Details of a task node   */
    taskNodeDetails: {
        path: "services/crstests/task_node_details",
        method: "GET",
        response: "json",
        auth: {
            consumer: "optional",
            token: "optional",
            sslRequired: false,
        },
    },
    /** Remove ReadPerm. @beta  */
    unsubscribe: {
        path: "services/crstests/unsubscribe",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
        },
    },
    /** Give grades to students. @beta  */
    updateGrades: {
        path: "services/crstests/update_grades",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["staff_perspective","crstests"],
        },
    },
    /** Give points to students. @beta  */
    updatePoints: {
        path: "services/crstests/update_points",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["staff_perspective","crstests"],
        },
    },
    /** Get student's grade for a single node. @beta  */
    userGrade: {
        path: "services/crstests/user_grade",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
        },
    },
    /** Notify about user's course test grade modification. @beta  */
    userGradeModified: {
        path: "services/crstests/user_grade_modified",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "ignored",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    /** Get student's grades for some nodes. @beta  */
    userGrades: {
        path: "services/crstests/user_grades",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["crstests","grades"],
        },
    },
    /** Notify USOS API that crstests grades were modified. @beta  */
    userGradesModified: {
        path: "services/crstests/user_grades_modified",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "ignored",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    /** Get points of a student for a single node. @beta  */
    userPoint: {
        path: "services/crstests/user_point",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
        },
    },
    /** Notify about user's course test points modification. @beta  */
    userPointModified: {
        path: "services/crstests/user_point_modified",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "ignored",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
    /** Get points of a student. @beta  */
    userPoints: {
        path: "services/crstests/user_points",
        method: "GET",
        response: "json",
        auth: {
            consumer: "required",
            token: "required",
            sslRequired: false,
            scopes: ["crstests"],
        },
    },
    /** Notify USOS API that crstests points were modified. @beta  */
    userPointsModified: {
        path: "services/crstests/user_points_modified",
        method: "POST",
        response: "json",
        auth: {
            consumer: "required",
            token: "ignored",
            administrativeOnly: true,
            sslRequired: false,
        },
    },
}
