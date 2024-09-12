// ActiveTab.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ActiveTab from '../../../main/components/active-tab/active-tab.vue'; // Adjust the path according to your file structure
import { useMessageStore } from '@/store/message/message-store';
import { useUserStore } from '@/store/user/user-store';

// Mock the stores to control their behavior
vi.mock('@/store/message/message-store', () => ({
	useMessageStore: vi.fn(),
}));

vi.mock('@/store/user/user-store', () => ({
	useUserStore: vi.fn(),
}));

describe('ActiveTab.vue', () => {
	let messageStoreMock: any;
	let userStoreMock: any;

	beforeEach(() => {
		// Reset mocks before each test
		messageStoreMock = {
			activeTab: { userid: 'user1', email: 'user1@example.com' },
			messages: [
				{ from: 'user1', to: 'user2', content: 'Hello!' },
				{ from: 'user2', to: 'user1', content: 'Hi there!' },
			],
		};

		userStoreMock = {};

		// Mock the implementation of the stores
		useMessageStore.mockReturnValue(messageStoreMock);
		useUserStore.mockReturnValue(userStoreMock);
	});

	it('renders correctly when a chat is active', () => {
		// Mount the component
		const wrapper = mount(ActiveTab);

		// Check if the correct elements are rendered
		expect(wrapper.find('.active-tab__content').exists()).toBe(true);
		expect(wrapper.find('h4.heading--xs').text()).toBe('user1@example.com');
		expect(wrapper.findAll('.message-item')).toHaveLength(2);
	});

	it('renders correctly when no chat is active', () => {
		// Modify mock to simulate no active chat
		messageStoreMock.activeTab.userid = null;

		// Mount the component
		const wrapper = mount(ActiveTab);

		// Check if the fallback content is rendered
		expect(wrapper.find('.heading--sm').text()).toBe('Select chat to messaging...');
	});

	it('should display messages correctly based on message ownership', () => {
		// Mount the component
		const wrapper = mount(ActiveTab);

		// Check message classes based on ownership
		const messages = wrapper.findAll('.message-item');
		expect(messages[0].classes()).toContain('bg-active-dark'); // Message from the user
		expect(messages[1].classes()).toContain('bg-white'); // Message from the other user
	});

	// it('should scroll to the bottom when messages change', async () => {
  //   // Mount the component
  //   const wrapper = mount(ActiveTab);

  //   // Find the message list element using its class name
  //   const messageListBlock = wrapper.find('.message-list').element;

  //   // Ensure the element was found
  //   expect(messageListBlock).not.toBeNull();

  //   // Mock the scrollHeight and scrollTop behaviors using vi.spyOn()
  //   const scrollHeightSpy = vi.spyOn(messageListBlock, 'scrollHeight', 'get').mockImplementation(() => 100);
  //   const scrollTopSpy = vi.spyOn(messageListBlock, 'scrollTop', 'set');

  //   // Simulate a message being added to trigger the scroll
  //   messageStoreMock.messages.push({ from: 'user2', to: 'user1', content: 'New message!' });

  //   // Wait for the component to process the state change
  //   await wrapper.vm.$nextTick();

  //   // Validate that scrollTop was set to the value of scrollHeight
  //   expect(scrollTopSpy).toHaveBeenCalledWith(100);

  //   // Ensure the scroll behavior occurred
  //   expect(scrollTopSpy).toHaveBeenCalled();
  // });
});
