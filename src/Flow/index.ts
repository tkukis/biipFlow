import AppUser from "./AppUser"

export enum REVIEW_STATUS {
    rejected = "rejected",
    returned = "returned",
    approved = "approved"
}
export enum STATUS {
    draft = "draft",
    submitted = "submitted",
    rejected = "rejected",
    returned = "returned",
    approved = "approved"
}

export interface Step {
    date?: Date
    userID: string | number
    data: any,
    action: STATUS
}
export enum ApproverType {
    user = "user",
    permission = "permission"
}
export interface Task {
    date?: Date
    approver: Approver
    stepId: string | number
}
export interface Approver {
    id: string | number
    type?: ApproverType
}
export interface Flow {
    assignerPermissions: Array<string>
    approvers: Array<Approver>,
    steps: Step[]
}

export function isValidChangeStatus(oldStatus: STATUS, newStatus: STATUS): boolean {
    if (oldStatus === STATUS.submitted) {
        return [STATUS.rejected, STATUS.returned, STATUS.approved].includes(newStatus)
    }
    if (oldStatus === STATUS.returned) {
        return newStatus === STATUS.submitted
    }
    if (oldStatus === STATUS.draft) {
        return newStatus === STATUS.submitted
    }
    return false
}

export function getStepTasks(flow: Flow, stepId) {
    const status = flow.steps[stepId]?.action
    if (status === STATUS.returned) {
        return [{
            approver: { id: flow.steps[0].userID }
        }]
    }
    if (status === STATUS.submitted) {
        return flow.approvers.map(a => {
            return {
                approver: a,
                stepId: stepId
            }
        })
    }
    return []
}
export function isFlowCompleted(flow: Flow) {
    const status = getFlowStatus(flow)
    return [STATUS.approved, STATUS.rejected].includes(status)
}

export function getOwnerId(flow: Flow) {
    if (flow.steps.length > 0) {
        return flow.steps[0].userID
    }
}

export function getActiveReviewId(flow: Flow): number | undefined {
    const status = getFlowStatus(flow)
    if (flow.steps.length > 0 && STATUS.submitted === status) {
        for (var i = flow.steps.length - 1; i >= 0; i--) {
            if (flow.steps[i].action === STATUS.submitted) {
                return i
            }
        }
    }
    return
}

export function addStep(flow: Flow, user: AppUser, action: STATUS, data: any, stepId: number = undefined): Flow | undefined {
    if ([STATUS.approved, STATUS.rejected, STATUS.returned].includes(action)) {
        if (stepId !== getActiveReviewId(flow)) {
            return
        }
    }
    if (isFlowCompleted(flow) || (!isValidChangeStatus(getFlowStatus(flow), action))) {
        return
    }
    if (action === STATUS.submitted && flow.steps.length > 0) {
        const ownerId = getOwnerId(flow)
        if (ownerId !== user.id) {
            return
        }
    }
    if (action === STATUS.rejected || action === STATUS.returned || action === STATUS.approved) {
        if (!flow.approvers.find(approver => approver.id === user.id)) {
            return
        }
    }

    const flowCopy: Flow = JSON.parse(JSON.stringify(flow));
    flowCopy.steps = [...flowCopy.steps, { action: action, data, userID: user.id }]
    return flowCopy
}

export function getFlowStatus(flow: Flow): STATUS {
    const steps = flow?.steps || []
    if (steps.length === 0) {
        return STATUS.draft
    }
    const noOfApprovers = flow.approvers.length
    if (noOfApprovers === 0) {
        return STATUS.approved
    }
    const lastAction = steps.slice(-1)[0].action
    if (lastAction === STATUS.approved) {
        const numberOfApprovals = steps.slice(-flow.approvers.length).filter(step => step.action === STATUS.approved).length
        if (numberOfApprovals >= noOfApprovers) {
            return STATUS.approved
        } else {
            return STATUS.submitted
        }
    }
    return lastAction
}