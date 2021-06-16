
import { getFlowStatus, STATUS } from "."
import { defaultUser } from "./AppUser"

describe("Flow engine", () => {
    test('getFlowStatus', () => {
        expect(getFlowStatus({
            assignerPermissions: [],
            approvers: [],
            steps: []
        })).toBe(STATUS.draft)
        expect(getFlowStatus({
            assignerPermissions: [],
            approvers: [],
            steps: [{
                userID: defaultUser.id,
                action: STATUS.submitted,
                data: {}
            }]
        })).toBe(STATUS.approved)
        expect(getFlowStatus({
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
        })).toBe(STATUS.approved)
        expect(getFlowStatus({
            approvers: [defaultUser, defaultUser],
            assignerPermissions: [],
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
        })).toBe(STATUS.submitted)
        expect(getFlowStatus({
            approvers: [defaultUser, defaultUser],
            assignerPermissions: [],
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
        })).toBe(STATUS.approved)
        expect(getFlowStatus({
            approvers: [defaultUser, defaultUser],
            assignerPermissions: [],
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
        })).toBe(STATUS.rejected)
    })
})
