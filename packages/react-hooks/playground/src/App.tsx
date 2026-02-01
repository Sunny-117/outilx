import React, { useState } from "react";
import UseMemoDemo from "./useMapDemo";
import UseCancelableDemo from "./UseCancelableDemo";
import ResourceDemo from "./ResourceDemo";
import UserListDemo from "./UserListDemo";
import MethodsDemo from "./MethodsDemo";

const demos = [
  { id: 'userlist', name: 'User List (完整示例)', component: UserListDemo },
  { id: 'methods', name: 'useMethods & useNumber', component: MethodsDemo },
  { id: 'resource', name: 'Resource Management', component: ResourceDemo },
  { id: 'map', name: 'useMap', component: UseMemoDemo },
  { id: 'cancelable', name: 'useCancelableAsyncTask', component: UseCancelableDemo },
];

export default function App() {
  const [activeDemo, setActiveDemo] = useState('userlist');
  
  const ActiveComponent = demos.find(d => d.id === activeDemo)?.component || UserListDemo;

  return (
    <div>
      <h1>@outilx/react-hooks Playground</h1>
      
      <nav>
        <h3>演示列表:</h3>
        {demos.map(demo => (
          <button
            key={demo.id}
            onClick={() => setActiveDemo(demo.id)}
            disabled={activeDemo === demo.id}
          >
            {demo.name}
          </button>
        ))}
      </nav>

      <hr />

      <main>
        <ActiveComponent />
      </main>
    </div>
  );
}
