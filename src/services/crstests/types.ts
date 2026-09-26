import type { AccessTokenCredentials } from '@/core/auth'
import type { Language } from '@/types/common'

/** The USOS API may return additional installation-specific fields. */
export interface CreatedTestNode { id: string | number }

export interface CrstestsAllUserGradesParams {
    "node_ids": readonly (string | number)[]
}

export interface CrstestsAllUserGradesOptions {
    nodeIds: readonly (string | number)[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsAllUserPointsParams {
    "node_ids": readonly (string | number)[]
}

export interface CrstestsAllUserPointsOptions {
    nodeIds: readonly (string | number)[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsChangeFolderNodePermissionsParams {
    "node_id": string | number
    "set": Readonly<Record<string, unknown>>
    "remove_from_subtree"?: Readonly<Record<string, unknown>>
}

export interface CrstestsChangeFolderNodePermissionsOptions {
    nodeId: string | number
    set: Readonly<Record<string, unknown>>
    removeFromSubtree?: Readonly<Record<string, unknown>>
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsChangeFolderNodePropertiesParams {
    "node_id": string | number
    "name_pl"?: string
    "name_en"?: string
    "results_visible_to_students"?: boolean
    "rules_visible_to_students"?: boolean
    "description_pl"?: string
    "description_en"?: string
}

export interface CrstestsChangeFolderNodePropertiesOptions {
    nodeId: string | number
    namePl?: string
    nameEn?: string
    resultsVisibleToStudents?: boolean
    rulesVisibleToStudents?: boolean
    descriptionPl?: string
    descriptionEn?: string
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsChangeGradeNodePermissionsParams {
    "node_id": string | number
    "set": Readonly<Record<string, unknown>>
    "remove_from_subtree"?: Readonly<Record<string, unknown>>
}

export interface CrstestsChangeGradeNodePermissionsOptions {
    nodeId: string | number
    set: Readonly<Record<string, unknown>>
    removeFromSubtree?: Readonly<Record<string, unknown>>
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsChangeGradeNodePropertiesParams {
    "node_id": string | number
    "name_pl"?: string
    "name_en"?: string
    "results_visible_to_students"?: boolean
    "rules_visible_to_students"?: boolean
    "algorithm"?: string
    "variables"?: Readonly<Record<string, unknown>>
    "algorithm_description_pl"?: string
    "algorithm_description_en"?: string
    "dependencies"?: Readonly<Record<string, unknown>>
}

export interface CrstestsChangeGradeNodePropertiesOptions {
    nodeId: string | number
    namePl?: string
    nameEn?: string
    resultsVisibleToStudents?: boolean
    rulesVisibleToStudents?: boolean
    algorithm?: string
    variables?: Readonly<Record<string, unknown>>
    algorithmDescriptionPl?: string
    algorithmDescriptionEn?: string
    dependencies?: Readonly<Record<string, unknown>>
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsChangeRootNodePermissionsParams {
    "node_id": string | number
    "set": Readonly<Record<string, unknown>>
    "remove_from_subtree"?: Readonly<Record<string, unknown>>
}

export interface CrstestsChangeRootNodePermissionsOptions {
    nodeId: string | number
    set: Readonly<Record<string, unknown>>
    removeFromSubtree?: Readonly<Record<string, unknown>>
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsChangeRootNodePropertiesParams {
    "node_id": string | number
    "name_pl"?: string
    "name_en"?: string
    "results_visible_to_students"?: boolean
    "rules_visible_to_students"?: boolean
    "description_pl"?: string
    "description_en"?: string
    "public"?: boolean
    "limit_to_groups"?: "false" | readonly string[]
}

export interface CrstestsChangeRootNodePropertiesOptions {
    nodeId: string | number
    namePl?: string
    nameEn?: string
    resultsVisibleToStudents?: boolean
    rulesVisibleToStudents?: boolean
    descriptionPl?: string
    descriptionEn?: string
    public?: boolean
    limitToGroups?: "false" | readonly string[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsChangeTaskNodePermissionsParams {
    "node_id": string | number
    "set": Readonly<Record<string, unknown>>
    "remove_from_subtree"?: Readonly<Record<string, unknown>>
}

export interface CrstestsChangeTaskNodePermissionsOptions {
    nodeId: string | number
    set: Readonly<Record<string, unknown>>
    removeFromSubtree?: Readonly<Record<string, unknown>>
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsChangeTaskNodePropertiesParams {
    "node_id": string | number
    "name_pl"?: string
    "name_en"?: string
    "results_visible_to_students"?: boolean
    "rules_visible_to_students"?: boolean
    "algorithm"?: string
    "variables"?: Readonly<Record<string, unknown>>
    "algorithm_description_pl"?: string
    "algorithm_description_en"?: string
    "dependencies"?: Readonly<Record<string, unknown>>
    "points_precision"?: number
    "points_min"?: number
    "points_max"?: number
}

export interface CrstestsChangeTaskNodePropertiesOptions {
    nodeId: string | number
    namePl?: string
    nameEn?: string
    resultsVisibleToStudents?: boolean
    rulesVisibleToStudents?: boolean
    algorithm?: string
    variables?: Readonly<Record<string, unknown>>
    algorithmDescriptionPl?: string
    algorithmDescriptionEn?: string
    dependencies?: Readonly<Record<string, unknown>>
    pointsPrecision?: number
    pointsMin?: number
    pointsMax?: number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsConnectTemplateToCourseEditionParams {
    "root_id": string | number
    "course_id": string | number
    "term_id": string | number
}

export interface CrstestsConnectTemplateToCourseEditionOptions {
    rootId: string | number
    courseId: string | number
    termId: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsCourseTestFields = "course_edition" | "is_limited_to_groups" | "class_groups" | "root" | `${string}[${string}]`
export interface CrstestsCourseTestResult {
    "course_edition"?: unknown
    "is_limited_to_groups"?: unknown
    "class_groups"?: unknown
    "root"?: unknown
}

export interface CrstestsCourseTestParams {
    "id": string | number
    "fields"?: readonly CrstestsCourseTestFields[]
}

export interface CrstestsCourseTestOptions {
    id: string | number
    fields?: readonly CrstestsCourseTestFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsCreateFolderNodeParams {
    "parent_id": string | number
    "name_pl"?: string
    "name_en"?: string
    "order"?: number
}

export interface CrstestsCreateFolderNodeOptions {
    parentId: string | number
    namePl?: string
    nameEn?: string
    order?: number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsCreateGradeNodeParams {
    "parent_id": string | number
    "grade_type": string
    "name_pl"?: string
    "name_en"?: string
    "order"?: number
}

export interface CrstestsCreateGradeNodeOptions {
    parentId: string | number
    gradeType: string
    namePl?: string
    nameEn?: string
    order?: number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsCreateRootNodeParams {
    "name_pl"?: string
    "name_en"?: string
    "description_pl"?: string
    "description_en"?: string
}

export interface CrstestsCreateRootNodeOptions {
    namePl?: string
    nameEn?: string
    descriptionPl?: string
    descriptionEn?: string
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsCreateTaskNodeParams {
    "parent_id": string | number
    "name_pl"?: string
    "name_en"?: string
    "order"?: number
    "points_min"?: number
    "points_max"?: number
    "points_precision"?: number
}

export interface CrstestsCreateTaskNodeOptions {
    parentId: string | number
    namePl?: string
    nameEn?: string
    order?: number
    pointsMin?: number
    pointsMax?: number
    pointsPrecision?: number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsDeleteSubtreeParams {
    "node_id": string | number
}

export interface CrstestsDeleteSubtreeOptions {
    nodeId: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsDuplicateSubtreeParams {
    "node_id": string | number
    "name_pl": string
    "name_en"?: string
}

export interface CrstestsDuplicateSubtreeOptions {
    nodeId: string | number
    namePl: string
    nameEn?: string
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsDuplicateTreeParams {
    "root_id": string | number
    "name_pl": string
    "name_en"?: string
}

export interface CrstestsDuplicateTreeOptions {
    rootId: string | number
    namePl: string
    nameEn?: string
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsExamineeFields = string

export interface CrstestsExamineeParams {
    "student_id": string | number
    "fields"?: readonly CrstestsExamineeFields[]
}

export interface CrstestsExamineeOptions {
    studentId: string | number
    fields?: readonly CrstestsExamineeFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsFolderNodeFields = "node_id" | "root_id" | "parent_id" | "order" | "name" | "results_visible_to_students" | "rules_visible_to_students" | "type" | "description" | "my_permissions" | "permissions" | `${string}[${string}]`
export interface CrstestsFolderNodeResult {
    "node_id"?: unknown
    "root_id"?: unknown
    "parent_id"?: unknown
    "order"?: unknown
    "name"?: unknown
    "results_visible_to_students"?: unknown
    "rules_visible_to_students"?: unknown
    "type"?: unknown
    "description"?: unknown
    "my_permissions"?: unknown
    "permissions"?: unknown
}

export interface CrstestsFolderNodeParams {
    "node_id": string | number
    "fields": readonly CrstestsFolderNodeFields[]
}

export interface CrstestsFolderNodeOptions {
    nodeId: string | number
    fields: readonly CrstestsFolderNodeFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsFolderNodeDetailsFields = "points_min" | "points_max" | `${string}[${string}]`
export interface CrstestsFolderNodeDetailsResult {
    "points_min"?: unknown
    "points_max"?: unknown
}

export interface CrstestsFolderNodeDetailsParams {
    "id": string | number
    "fields": readonly CrstestsFolderNodeDetailsFields[]
}

export interface CrstestsFolderNodeDetailsOptions {
    id: string | number
    fields: readonly CrstestsFolderNodeDetailsFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsGradeNodeFields = "node_id" | "root_id" | "parent_id" | "order" | "name" | "results_visible_to_students" | "rules_visible_to_students" | "type" | "grade_type" | "my_permissions" | "permissions" | "dependencies" | "variables" | "algorithm" | "algorithm_description" | `${string}[${string}]`
export interface CrstestsGradeNodeResult {
    "node_id"?: unknown
    "root_id"?: unknown
    "parent_id"?: unknown
    "order"?: unknown
    "name"?: unknown
    "results_visible_to_students"?: unknown
    "rules_visible_to_students"?: unknown
    "type"?: unknown
    "grade_type"?: unknown
    "my_permissions"?: unknown
    "permissions"?: unknown
    "dependencies"?: unknown
    "variables"?: unknown
    "algorithm"?: unknown
    "algorithm_description"?: unknown
}

export interface CrstestsGradeNodeParams {
    "node_id": string | number
    "fields": readonly CrstestsGradeNodeFields[]
}

export interface CrstestsGradeNodeOptions {
    nodeId: string | number
    fields: readonly CrstestsGradeNodeFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsGradeNodeDetailsFields = "grade_type" | "dependencies" | "variables" | "algorithm" | "algorithm_description" | "students_grade" | "all_students_grades" | `${string}[${string}]`
export interface CrstestsGradeNodeDetailsResult {
    "grade_type"?: unknown
    "dependencies"?: unknown
    "variables"?: unknown
    "algorithm"?: unknown
    "algorithm_description"?: unknown
    "students_grade"?: unknown
    "all_students_grades"?: unknown
}

export interface CrstestsGradeNodeDetailsParams {
    "id": string | number
    "fields": readonly CrstestsGradeNodeDetailsFields[]
}

export interface CrstestsGradeNodeDetailsOptions {
    id: string | number
    fields: readonly CrstestsGradeNodeDetailsFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsGroupsParams {
    "root_id": string | number
}

export interface CrstestsGroupsOptions {
    rootId: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsLecturerFields = "tests" | "templates" | "terms" | `${string}[${string}]`
export interface CrstestsLecturerResult {
    "tests"?: unknown
    "templates"?: unknown
    "terms"?: unknown
}

export interface CrstestsLecturerParams {
}

export interface CrstestsLecturerOptions {
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsLecturer2Fields = string

export interface CrstestsLecturer2Params {
    "fields"?: readonly CrstestsLecturer2Fields[]
    "active_terms_only"?: boolean
}

export interface CrstestsLecturer2Options {
    fields?: readonly CrstestsLecturer2Fields[]
    activeTermsOnly?: boolean
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsMoveNodeParams {
    "node_id": string | number
    "new_parent_id": string | number
    "new_order": number
}

export interface CrstestsMoveNodeOptions {
    nodeId: string | number
    newParentId: string | number
    newOrder: number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsNodeFields = string

export interface CrstestsNodeParams {
    "node_id": string | number
    "recursive": boolean
    "fields": readonly CrstestsNodeFields[]
}

export interface CrstestsNodeOptions {
    nodeId: string | number
    recursive: boolean
    fields: readonly CrstestsNodeFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsNodeGradesParams {
    "node_id": string | number
}

export interface CrstestsNodeGradesOptions {
    nodeId: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsNodePointsParams {
    "node_id": string | number
}

export interface CrstestsNodePointsOptions {
    nodeId: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsNodeStatsFields = "value" | "number_of_values" | `${string}[${string}]`
export interface CrstestsNodeStatsResult {
    "value"?: unknown
    "number_of_values"?: unknown
}

export interface CrstestsNodeStatsParams {
    "node_id": string | number
}

export interface CrstestsNodeStatsOptions {
    nodeId: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsNode2Fields = "id" | "course_test" | "parent_id" | "order" | "name" | "description" | "results_visible_to_students" | "rules_visible_to_students" | "type" | "my_permissions" | "subnodes" | "subnodes_deep" | "task_node_details" | "folder_node_details" | "grade_node_details" | "stats" | "students_points" | `${string}[${string}]`
export interface CrstestsNode2Result {
    "id"?: unknown
    "course_test"?: unknown
    "parent_id"?: unknown
    "order"?: unknown
    "name"?: unknown
    "description"?: unknown
    "results_visible_to_students"?: unknown
    "rules_visible_to_students"?: unknown
    "type"?: unknown
    "my_permissions"?: unknown
    "subnodes"?: unknown
    "subnodes_deep"?: unknown
    "task_node_details"?: unknown
    "folder_node_details"?: unknown
    "grade_node_details"?: unknown
    "stats"?: unknown
    "students_points"?: unknown
}

export interface CrstestsNode2Params {
    "node_id": string | number
    "fields"?: readonly CrstestsNode2Fields[]
}

export interface CrstestsNode2Options {
    nodeId: string | number
    fields?: readonly CrstestsNode2Fields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsParticipantFields = "tests" | "terms" | `${string}[${string}]`
export interface CrstestsParticipantResult {
    "tests"?: unknown
    "terms"?: unknown
}

export interface CrstestsParticipantParams {
}

export interface CrstestsParticipantOptions {
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsParticipant2Fields = string

export interface CrstestsParticipant2Params {
    "fields"?: readonly CrstestsParticipant2Fields[]
    "active_terms_only"?: boolean
}

export interface CrstestsParticipant2Options {
    fields?: readonly CrstestsParticipant2Fields[]
    activeTermsOnly?: boolean
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsPublicTemplatesParams {
}

export interface CrstestsPublicTemplatesOptions {
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsRootNodeFields = "node_id" | "root_id" | "parent_id" | "order" | "name" | "results_visible_to_students" | "rules_visible_to_students" | "type" | "public" | "limit_to_groups" | "course_edition" | "description" | "my_permissions" | "permissions" | `${string}[${string}]`
export interface CrstestsRootNodeResult {
    "node_id"?: unknown
    "root_id"?: unknown
    "parent_id"?: unknown
    "order"?: unknown
    "name"?: unknown
    "results_visible_to_students"?: unknown
    "rules_visible_to_students"?: unknown
    "type"?: unknown
    "public"?: unknown
    "limit_to_groups"?: unknown
    "course_edition"?: unknown
    "description"?: unknown
    "my_permissions"?: unknown
    "permissions"?: unknown
}

export interface CrstestsRootNodeParams {
    "node_id": string | number
    "fields": readonly CrstestsRootNodeFields[]
}

export interface CrstestsRootNodeOptions {
    nodeId: string | number
    fields: readonly CrstestsRootNodeFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsRootNodesFields = string

export interface CrstestsRootNodesParams {
    "node_ids": readonly (string | number)[]
    "fields": readonly CrstestsRootNodesFields[]
}

export interface CrstestsRootNodesOptions {
    nodeIds: readonly (string | number)[]
    fields: readonly CrstestsRootNodesFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsStudentGradeFields = "grade_value" | "automatic_grade_value" | "is_editable" | "private_comment" | "comment" | "grader" | "last_changed" | "student" | `${string}[${string}]`
export interface CrstestsStudentGradeResult {
    "grade_value"?: unknown
    "automatic_grade_value"?: unknown
    "is_editable"?: unknown
    "private_comment"?: unknown
    "comment"?: unknown
    "grader"?: unknown
    "last_changed"?: unknown
    "student"?: unknown
}

export interface CrstestsStudentGradeParams {
    "node_id": string | number
    "fields"?: readonly CrstestsStudentGradeFields[]
}

export interface CrstestsStudentGradeOptions {
    nodeId: string | number
    fields?: readonly CrstestsStudentGradeFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsStudentPointFields = "points" | "automatic_points" | "comment" | "grader" | "student" | "last_changed" | "is_editable" | `${string}[${string}]`
export interface CrstestsStudentPointResult {
    "points"?: unknown
    "automatic_points"?: unknown
    "comment"?: unknown
    "grader"?: unknown
    "student"?: unknown
    "last_changed"?: unknown
    "is_editable"?: unknown
}

export interface CrstestsStudentPointParams {
    "node_id": string | number
    "fields"?: readonly CrstestsStudentPointFields[]
}

export interface CrstestsStudentPointOptions {
    nodeId: string | number
    fields?: readonly CrstestsStudentPointFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsSubscribeParams {
    "node_id": string | number
}

export interface CrstestsSubscribeOptions {
    nodeId: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsTaskNodeFields = "node_id" | "root_id" | "parent_id" | "order" | "name" | "results_visible_to_students" | "rules_visible_to_students" | "type" | "points_min" | "points_max" | "points_precision" | "my_permissions" | "permissions" | "dependencies" | "variables" | "algorithm" | "algorithm_description" | `${string}[${string}]`
export interface CrstestsTaskNodeResult {
    "node_id"?: unknown
    "root_id"?: unknown
    "parent_id"?: unknown
    "order"?: unknown
    "name"?: unknown
    "results_visible_to_students"?: unknown
    "rules_visible_to_students"?: unknown
    "type"?: unknown
    "points_min"?: unknown
    "points_max"?: unknown
    "points_precision"?: unknown
    "my_permissions"?: unknown
    "permissions"?: unknown
    "dependencies"?: unknown
    "variables"?: unknown
    "algorithm"?: unknown
    "algorithm_description"?: unknown
}

export interface CrstestsTaskNodeParams {
    "node_id": string | number
    "fields": readonly CrstestsTaskNodeFields[]
}

export interface CrstestsTaskNodeOptions {
    nodeId: string | number
    fields: readonly CrstestsTaskNodeFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export type CrstestsTaskNodeDetailsFields = "points_min" | "points_max" | "points_precision" | "dependencies" | "variables" | "algorithm" | "algorithm_description" | "students_points" | "all_students_points" | `${string}[${string}]`
export interface CrstestsTaskNodeDetailsResult {
    "points_min"?: unknown
    "points_max"?: unknown
    "points_precision"?: unknown
    "dependencies"?: unknown
    "variables"?: unknown
    "algorithm"?: unknown
    "algorithm_description"?: unknown
    "students_points"?: unknown
    "all_students_points"?: unknown
}

export interface CrstestsTaskNodeDetailsParams {
    "id": string | number
    "fields"?: readonly CrstestsTaskNodeDetailsFields[]
}

export interface CrstestsTaskNodeDetailsOptions {
    id: string | number
    fields?: readonly CrstestsTaskNodeDetailsFields[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsUnsubscribeParams {
    "node_id": string | number
}

export interface CrstestsUnsubscribeOptions {
    nodeId: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsUpdateGradesParams {
    "node_id": string | number
    "new_grades": Readonly<Record<string, unknown>>
}

export interface CrstestsUpdateGradesOptions {
    nodeId: string | number
    newGrades: Readonly<Record<string, unknown>>
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsUpdatePointsParams {
    "new_points": Readonly<Record<string, unknown>>
    "node_id": string | number
}

export interface CrstestsUpdatePointsOptions {
    newPoints: Readonly<Record<string, unknown>>
    nodeId: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsUserGradeParams {
    "node_id": string | number
}

export interface CrstestsUserGradeOptions {
    nodeId: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsUserGradeModifiedParams {
    "operation": string
    "node_id": string | number
    "related_user_ids": readonly (string | number)[]
}

export interface CrstestsUserGradeModifiedOptions {
    operation: string
    nodeId: string | number
    relatedUserIds: readonly (string | number)[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsUserGradesParams {
    "node_ids": readonly (string | number)[]
}

export interface CrstestsUserGradesOptions {
    nodeIds: readonly (string | number)[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsUserGradesModifiedParams {
    "user_grade_modified_params": string
}

export interface CrstestsUserGradesModifiedOptions {
    userGradeModifiedParams: readonly Record<string, unknown>[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsUserPointParams {
    "node_id": string | number
}

export interface CrstestsUserPointOptions {
    nodeId: string | number
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsUserPointModifiedParams {
    "operation": string
    "node_id": string | number
    "related_user_ids": readonly (string | number)[]
}

export interface CrstestsUserPointModifiedOptions {
    operation: string
    nodeId: string | number
    relatedUserIds: readonly (string | number)[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsUserPointsParams {
    "node_ids": readonly (string | number)[]
}

export interface CrstestsUserPointsOptions {
    nodeIds: readonly (string | number)[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}

export interface CrstestsUserPointsModifiedParams {
    "user_point_modified_params": string
}

export interface CrstestsUserPointsModifiedOptions {
    userPointModifiedParams: readonly Record<string, unknown>[]
    /** Overrides the token in the client context when this endpoint accepts one. */
    accessToken?: AccessTokenCredentials
}
