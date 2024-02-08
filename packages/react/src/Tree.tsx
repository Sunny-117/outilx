import React, { useState } from "react";

export type DataNode = {
  title: React.ReactNode;
  key: string;
  children?: DataNode[];
};

const TreeNode = ({ node }: { node: DataNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    if (node.children) {
      setCollapsed(!collapsed);
    }
  };

  return (
    <div>
      <div onClick={handleToggle} style={{ cursor: "pointer" }}>
        {node.children && (collapsed ? "▶" : "▼")} {node.title}
      </div>
      {node.children && !collapsed && (
        <div style={{ marginLeft: "20px" }}>
          {node.children.map((childNode) => (
            <TreeNode key={childNode.key} node={childNode} />
          ))}
        </div>
      )}
    </div>
  );
};

const Tree = ({ treeData }: { treeData: DataNode[] }) => {
  return (
    <div>
      {treeData.map((node) => (
        <TreeNode key={node.key} node={node} />
      ))}
    </div>
  );
};

export { Tree };
