
import { addStep, Flow, getActiveReviewId, getFlowStatus, STATUS } from "."
import { defaultUser } from "./AppUser"

describe("Flow engine", () => {
    test('addStep', () => {
        const result = addStep({
            assignerPermissions: [],
            approvers: [],
            steps: []
        }, defaultUser, STATUS.submitted, {})
        expect(result.steps.length).toBe(1)
    })
    test('addStep', () => {
        expect(addStep({
            assignerPermissions: [],
            approvers: [],
            steps: []
        }, defaultUser, STATUS.approved, {})).toBe(undefined)
    })
    test('addStep', () => {
        expect(addStep({
            assignerPermissions: [],
            approvers: [],
            steps: []
        }, defaultUser, STATUS.rejected, {})).toBe(undefined)
    })
    test.only('flow', () => {
        let flow: Flow = {
            assignerPermissions: [],
            approvers: [{ id: "tomas" }, { id: "tomas" }],
            steps: []
        }

        flow = addStep(flow, defaultUser, STATUS.submitted, {})
        expect(getFlowStatus(flow)).toBe(STATUS.submitted)

        flow = addStep(flow, defaultUser, STATUS.returned, {}, 0)
        expect(getFlowStatus(flow)).toBe(STATUS.returned)
        flow = addStep(flow, defaultUser, STATUS.submitted, {})
        expect(getFlowStatus(flow)).toBe(STATUS.submitted)
        flow = addStep(flow, defaultUser, STATUS.rejected, {}, getActiveReviewId(flow))
        expect(getFlowStatus(flow)).toBe(STATUS.rejected)
    })
    test('permissions', () => {
        let flow: Flow = {
            assignerPermissions: [],
            approvers: [{ id: "tomas" }, { id: "jonas" }],
            steps: []
        }

        flow = addStep(flow, defaultUser, STATUS.submitted, {})
        expect(getFlowStatus(flow)).toBe(STATUS.submitted)
        flow = addStep(flow, defaultUser, STATUS.returned, {}, 0)
        expect(getFlowStatus(flow)).toBe(STATUS.returned)
        return
        expect(addStep(flow, { ...defaultUser, id: "other" }, STATUS.submitted, {})).toBe(undefined)
        flow = addStep(flow, defaultUser, STATUS.submitted, {})
        expect(flow).toBeDefined()
        //we cannot add opinion two times
        //TODO expect(addStep(flow, { ...defaultUser, id: "tomas" }, STATUS.approved, {})).toBe(undefined)

        expect(addStep(flow, { ...defaultUser, id: "other" }, STATUS.rejected, {}, getActiveReviewId(flow))).toBe(undefined)
        flow = addStep(flow, defaultUser, STATUS.rejected, {}, 0)
        expect(flow).toBeDefined()
        expect(getFlowStatus(flow)).toBe(STATUS.rejected)
    })
})
