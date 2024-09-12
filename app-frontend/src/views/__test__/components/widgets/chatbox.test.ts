// Chatbox.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Chatbox from '../../../main/components/widgets/chatbox.vue'; // Adjust the path according to your file structure
import { useMessageStore } from '@/store/message/message-store';
import { useUserStore } from '@/store/user/user-store';
import socket from '@/socket';

// Mock the socket module
vi.mock('@/socket', () => ({
	default: {
		emit: vi.fn(),
	},
}));

// Mock the stores
vi.mock('@/store/message/message-store', () => ({
	useMessageStore: vi.fn(),
}));

vi.mock('@/store/user/user-store', () => ({
	useUserStore: vi.fn(),
}));

describe('Chatbox.vue', () => {
	let messageStoreMock: any;
	let userStoreMock: any;

	beforeEach(() => {
		// Set up mocks for the stores
		messageStoreMock = {
			activeTab: { userid: 'user1' },
			messages: [],
			setMessageList: vi.fn(),
		};

		userStoreMock = {
			user: { id: 'user1', email: 'user1@example.com' },
		};

		// Mock the store returns
		useMessageStore.mockReturnValue(messageStoreMock);
		useUserStore.mockReturnValue(userStoreMock);
	});

	it('should emit a message and handle the response correctly', async () => {
		// Mount the component
		const wrapper = mount(Chatbox);

		// Find the input and set a message
		const input = wrapper.find('input');
		await input.setValue('Hello, world!');

		// Find the form and trigger submit
		await wrapper.find('form').trigger('submit.prevent');

		// Check that the socket emit function was called with the correct data
		expect(socket.emit).toHaveBeenCalledWith(
			'dm',
			{ to: 'user1', from: null, content: 'Hello, world!' },
			expect.any(Function) // Callback function that handles the socket response
		);

		// Simulate the socket response by invoking the callback
		const emitCallback = socket.emit.mock.calls[0][2]; // Get the callback from the mock
		emitCallback({ error: '', done: true, messageItem: { content: 'Hello, world!', from: 'user1', to: 'user2' } });

		// Verify that setMessageList was called with the correct updated messages
		expect(messageStoreMock.setMessageList).toHaveBeenCalledWith([
			{ content: 'Hello, world!', from: 'user1', to: 'user2' },
			...messageStoreMock.messages,
		]);

		// Check that the input is cleared after the message is sent
		expect(wrapper.find('input').element.value).toBe('');
	});

	it('should handle socket errors correctly', async () => {
		// Mount the component
		const wrapper = mount(Chatbox);

		// Set an input value
		const input = wrapper.find('input');
		await input.setValue('This will fail');

		// Submit the form
		await wrapper.find('form').trigger('submit.prevent');

		// Verify that the socket emit was called correctly
		expect(socket.emit).toHaveBeenCalledWith(
			'dm',
			{ to: 'user1', from: null, content: 'This will fail' },
			expect.any(Function)
		);

		// Simulate an error response from the socket
		const emitCallback = socket.emit.mock.calls[0][2];
		emitCallback({ error: 'Error sending message', done: false, messageItem: null });

		// You can add additional assertions to check how your component handles the error
		expect(messageStoreMock.setMessageList).not.toHaveBeenCalled();
	});
});
