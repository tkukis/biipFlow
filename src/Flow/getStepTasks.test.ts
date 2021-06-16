
import { getFlowStatus, isFlowCompleted, STATUS } from "."
import { defaultUser } from "./AppUser"

describe("Flow engine", () => {
    test('isFlowCompleted', () => {
        expect(isFlowCompleted({
            assignerPermissions: [],
            approvers: [],
            steps: [],
        })).toBe(false)
        expect(isFlowCompleted({
            assignerPermissions: [],
            approvers: [],
            steps: [{
                userID: defaultUser.id,
                action: STATUS.submitted,
                data: {}
            }]
        })).toBe(true)
        expect(isFlowCompleted({
            assignerPermissions: [],
            approvers: [defaultUser],
            steps: [{
                userID: defaultUser.id,
                action: STATUS.submitted,
                data: {}
            },
            {
                userID: defaultUser.id,
                action: STATUS.approved,
                data: {}
            }

            ]
        })).toBe(true)
        expect(isFlowCompleted({
            assignerPermissions: [],
            approvers: [defaultUser, defaultUser],
            steps: [{
                action: STATUS.submitted,
                userID: defaultUser.id,
                data: {}
            },
            {
                userID: defaultUser.id,
                action: STATUS.approved,
                data: {}
            }

            ]
        })).toBe(false)
        expect(isFlowCompleted({
            assignerPermissions: [],
            approvers: [defaultUser, defaultUser],
            steps: [{
                userID: defaultUser.id,
                action: STATUS.submitted,
                data: {}
            },
            {
                userID: defaultUser.id,
                action: STATUS.approved,
                data: {}
            },
            {
                userID: defaultUser.id,
                action: STATUS.approved,
                data: {}
            }

            ]
        })).toBe(true)
        expect(isFlowCompleted({
            assignerPermissions: [],
            approvers: [defaultUser, defaultUser],
            steps: [{
                userID: defaultUser.id,
                action: STATUS.submitted,
                data: {}
            },
            {
                userID: defaultUser.id,
                action: STATUS.approved,
                data: {}
            },
            {
                userID: defaultUser.id,
                action: STATUS.rejected,
                data: {}
            }

            ]
        })).toBe(true)
    })
})
