export interface IActiveTab {
  email: string,
  id: string
};

export interface IChatItem {
  email: string,
  userid: string,
  connected: string,
}

export interface IMessageItem {
  from: string,
  to: string,
  content: string,
}

export interface IMessageStore {
  activeTab: IChatItem,
  chatList: IChatItem[],
  messages: Array<IMessageItem>,
  // modal: IModal
};