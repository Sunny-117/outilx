import React, { useEffect, useCallback, useState } from 'react';
import { useArray, useTaskPendingState } from '@outilx/react-hooks';

// Mock API request
const mockRequest = (path: string, params: { pageNo: number } = { pageNo: 1 }) => 
  new Promise<Array<{ id: number; text: string }>>((resolve) => {
    const { pageNo } = params;
    setTimeout(() => {
      const offset = (pageNo - 1) * 10;
      resolve([
        { id: offset + 1, text: `用户-${offset + 1}` },
        { id: offset + 2, text: `用户-${offset + 2}` },
        { id: offset + 3, text: `用户-${offset + 3}` },
      ]);
    }, 1000);
  });

// Custom hook combining useArray and useTaskPendingState
function useUserList() {
  const [users, { push, removeById, set }] = useArray<{ id: number; text: string }>([]);
  const [load, pending] = useTaskPendingState(mockRequest, set);
  
  return [users, { pending, load, addUser: push, deleteUser: removeById }] as const;
}

// User component
interface UserProps {
  id: number;
  text: string;
  deleteUser: (id: number) => void;
}

function User({ id, text, deleteUser }: UserProps) {
  const handleDelete = useCallback(() => {
    deleteUser(id);
  }, [deleteUser, id]);

  return (
    <div>
      ID: {id} | 姓名: {text} | <button onClick={handleDelete}>删除</button>
    </div>
  );
}

// UserList component
interface UserListProps {
  pageNo: number;
}

function UserList({ pageNo }: UserListProps) {
  const [users, { pending, load, addUser, deleteUser }] = useUserList();

  useEffect(() => {
    load('/data/user/list', { pageNo });
  }, [pageNo, load]);

  const handleAdd = useCallback(() => {
    const id = Date.now();
    addUser({ id, text: `新用户-${id}` });
  }, [addUser]);

  if (pending && users.length === 0) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      {users.map((user) => (
        <User key={user.id} id={user.id} text={user.text} deleteUser={deleteUser} />
      ))}
      <button onClick={handleAdd} disabled={pending}>
        {pending ? '加载中...' : '添加用户'}
      </button>
    </div>
  );
}

// Main demo component
export default function UserListDemo() {
  const [pageNo, setPageNo] = useState(1);

  return (
    <div>
      <h2>用户列表管理 Demo</h2>
      <p>演示 useArray + useTaskPendingState 组合使用</p>
      
      <div>
        <button onClick={() => setPageNo(p => Math.max(1, p - 1))} disabled={pageNo === 1}>
          上一页
        </button>
        <span> 第 {pageNo} 页 </span>
        <button onClick={() => setPageNo(p => p + 1)}>
          下一页
        </button>
      </div>

      <hr />

      <UserList pageNo={pageNo} />

      <hr />

      <div>
        <h4>功能说明：</h4>
        <ul>
          <li>点击"上一页/下一页"切换页码，自动加载数据</li>
          <li>点击"添加用户"在列表中添加新用户</li>
          <li>点击"删除"按钮移除对应用户</li>
          <li>加载时显示 loading 状态</li>
        </ul>
      </div>
    </div>
  );
}
