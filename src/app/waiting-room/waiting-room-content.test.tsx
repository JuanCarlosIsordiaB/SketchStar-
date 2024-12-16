import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import WaitingRoomContent from './waiting-room-content'
import { useRouter, useSearchParams } from 'next/navigation'

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useSearchParams: jest.fn()
}))

describe('WaitingRoomContent', () => {
    const mockPush = jest.fn()
    const mockUseRouter = useRouter as jest.Mock
    const mockUseSearchParams = useSearchParams as jest.Mock

    beforeEach(() => {
        mockUseRouter.mockReturnValue({ push: mockPush })
        mockUseSearchParams.mockReturnValue({
            get: (key: string) => {
                if (key === 'room') return 'Test Room'
                if (key === 'player') return 'Test Player'
                return null
            }
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('renders the room name and player name', () => {
        render(<WaitingRoomContent />)
        expect(screen.getByText('Room: Test Room')).toBeInTheDocument()
        expect(screen.getByText('Test Player (You)')).toBeInTheDocument()
    })

    it('simulates players joining the room', async () => {
        render(<WaitingRoomContent />)
        await waitFor(() => {
            expect(screen.getByText('Player 2')).toBeInTheDocument()
        }, { timeout: 2500 })
        await waitFor(() => {
            expect(screen.getByText('Player 3')).toBeInTheDocument()
        }, { timeout: 4500 })
        await waitFor(() => {
            expect(screen.getByText('Player 4')).toBeInTheDocument()
        }, { timeout: 6500 })
    })

    it('enables the Start Game button when enough players have joined', async () => {
        render(<WaitingRoomContent />)
        const startButton = screen.getByText('Start Game')
        expect(startButton).toBeDisabled()

        await waitFor(() => {
            expect(screen.getByText('Player 4')).toBeInTheDocument()
        }, { timeout: 6500 })

        expect(startButton).not.toBeDisabled()
    })

    it('navigates to the game page when Start Game button is clicked', async () => {
        render(<WaitingRoomContent />)
        await waitFor(() => {
            expect(screen.getByText('Player 4')).toBeInTheDocument()
        }, { timeout: 6500 })

        const startButton = screen.getByText('Start Game')
        fireEvent.click(startButton)
        expect(mockPush).toHaveBeenCalledWith('/game')
    })
})