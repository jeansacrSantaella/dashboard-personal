"use client";

import {
  Background,
  Controls,
  Edge,
  MarkerType,
  Node,
  Position,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useMemo } from "react";

export function MicrofrontendsFlowChart() {
  const nodes: Node[] = useMemo(
    () => [
      {
        id: "host",
        data: {
          label: (
            <div className="text-left">
              <div className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                Container Host :3000
              </div>
              <div className="font-semibold text-xs text-foreground">
                React Shell Container
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                Layout Base · Enrutamiento · Event Bus
              </div>
            </div>
          ),
        },
        position: { x: 180, y: 20 },
        sourcePosition: Position.Bottom,
        className:
          "w-64 rounded-xl border-2 border-indigo-500/60 bg-card p-3 shadow-md shadow-indigo-500/10",
      },
      {
        id: "remote-react",
        data: {
          label: (
            <div className="text-left">
              <div className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-wider">
                Remote MFE :3001
              </div>
              <div className="font-semibold text-xs text-foreground">
                React Remote (Puro)
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                Suspense · Singleton Shared
              </div>
            </div>
          ),
        },
        position: { x: 30, y: 170 },
        targetPosition: Position.Top,
        className:
          "w-56 rounded-xl border border-sky-500/50 bg-card p-3 shadow-sm",
      },
      {
        id: "remote-angular",
        data: {
          label: (
            <div className="text-left">
              <div className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider">
                Remote MFE :4200
              </div>
              <div className="font-semibold text-xs text-foreground">
                Angular Elements
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">
                Custom Elements (W3C) · Zone.js aislado
              </div>
            </div>
          ),
        },
        position: { x: 330, y: 170 },
        targetPosition: Position.Top,
        className:
          "w-56 rounded-xl border border-rose-500/50 bg-card p-3 shadow-sm",
      },
    ],
    [],
  );

  const edges: Edge[] = useMemo(
    () => [
      {
        id: "e-host-react",
        source: "host",
        target: "remote-react",
        label: "GET remoteEntry.js",
        animated: true,
        style: { stroke: "#38bdf8", strokeWidth: 1.5 },
        labelStyle: { fill: "#94a3b8", fontSize: 10, fontFamily: "monospace" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#38bdf8" },
      },
      {
        id: "e-host-angular",
        source: "host",
        target: "remote-angular",
        label: "GET remoteEntry.js",
        animated: true,
        style: { stroke: "#f43f5e", strokeWidth: 1.5 },
        labelStyle: { fill: "#94a3b8", fontSize: 10, fontFamily: "monospace" },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#f43f5e" },
      },
    ],
    [],
  );

  return (
    <div className="h-[280px] w-full rounded-lg border border-border bg-background/50 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        proOptions={{ hideAttribution: true }}
        nodesDraggable={true}
        nodesConnectable={false}
      >
        <Background gap={16} size={1} className="opacity-40" />
        <Controls
          showInteractive={false}
          className="bg-card border border-border scale-75 origin-bottom-left"
        />
      </ReactFlow>
    </div>
  );
}
