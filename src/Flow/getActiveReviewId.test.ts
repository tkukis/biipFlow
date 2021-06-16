
import { getActiveReviewId, getFlowStatus, STATUS } from "."
import { defaultUser } from "./AppUser"

describe("getActiveReviewId", () => {
    test.only('getActiveReviewId.test', () => {
        expect(getActiveReviewId({
            assignerPermissions: [],
            approvers: [],
            steps: []
        })).toBe(undefined)
        expect(getActiveReviewId({
            assignerPermissions: [],
            approvers: [defaultUser],
            steps: [{
                action: STATUS.submitted,
                data: {},
                userID: defaultUser.id
            }]
        })).toBe(0)
        expect(getActiveReviewId({
            assignerPermissions: [],
            approvers: [defaultUser, defaultUser],
            steps: [{
                action: STATUS.submitted,
                data: {},
                userID: defaultUser.id
            }, {
                action: STATUS.approved,
                data: {},
                userID: defaultUser.id
            }]
        })).toBe(0)
        expect(getActiveReviewId({
            assignerPermissions: [],
            approvers: [defaultUser],
            steps: [{
                action: STATUS.submitted,
                data: {},
                userID: defaultUser.id
            }, {
                action: STATUS.returned,
                data: {},
                userID: defaultUser.id
            }, {
                action: STATUS.submitted,
                data: {},
                userID: defaultUser.id
            }]
        })).toBe(2)
        expect(getActiveReviewId({
            assignerPermissions: [],
            approvers: [defaultUser, defaultUser],
            steps: [{
                action: STATUS.submitted,
                data: {},
                userID: defaultUser.id
            }, {
                action: STATUS.returned,
                data: {},
                userID: defaultUser.id
            }, {
                action: STATUS.submitted,
                data: {},
                userID: defaultUser.id
            }, {
                action: STATUS.approved,
                data: {},
                userID: defaultUser.id
            }]
        })).toBe(2)
        expect(getActiveReviewId({
            assignerPermissions: [],
            approvers: [defaultUser, defaultUser],
            steps: [{
                action: STATUS.submitted,
                data: {},
                userID: defaultUser.id
            }, {
                action: STATUS.returned,
                data: {},
                userID: defaultUser.id
            }, {
                action: STATUS.submitted,
                data: {},
                userID: defaultUser.id
            }, {
                action: STATUS.approved,
                data: {},
                userID: defaultUser.id
            }, {
                action: STATUS.approved,
                data: {},
                userID: defaultUser.id
            }]
        })).toBe(undefined)
    })
})
