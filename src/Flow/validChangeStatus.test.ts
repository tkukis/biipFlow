
import { getFlowStatus, STATUS, isValidChangeStatus } from "."

describe("Flow engine", () => {
    test('isValidChangeStatus', () => {
        expect(isValidChangeStatus(STATUS.submitted, STATUS.approved)).toBe(true)
        expect(isValidChangeStatus(STATUS.submitted, STATUS.rejected)).toBe(true)
        expect(isValidChangeStatus(STATUS.submitted, STATUS.returned)).toBe(true)
        expect(isValidChangeStatus(STATUS.submitted, STATUS.draft)).toBe(false)
        expect(isValidChangeStatus(STATUS.draft, STATUS.approved)).toBe(false)
        expect(isValidChangeStatus(STATUS.returned, STATUS.submitted)).toBe(true)


    })
})
