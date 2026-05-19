'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { AnimationFrame, CountUp, ease } from './shared';
import { AppIcon, type AppId } from './AppIcon';

type Pt = { x: number; y: number };

type NodeDef =
    | { id: string; kind: 'app'; appId: AppId; pos: Pt; r: number }
    | { id: string; kind: 'hub'; pos: Pt; r: number }
    | { id: string; kind: 'project'; label: string; pos: Pt; r: number };

type EdgeDef = {
    id: string;
    from: string;
    to: string;
    label?: string;
    /** Quadratic curve offset (viewBox units, perpendicular to chord) */
    curve?: number;
    /** Fixed label position — avoids overlap from auto-placement */
    labelPos?: Pt;
};

const NODES: NodeDef[] = [
    { id: 'microsoft', kind: 'app', appId: 'microsoft', pos: { x: 13, y: 16 }, r: 4.5 },
    { id: 'slack', kind: 'app', appId: 'slack', pos: { x: 13, y: 42 }, r: 4.5 },
    { id: 'jira', kind: 'app', appId: 'jira', pos: { x: 13, y: 68 }, r: 4.5 },
    { id: 'gmail', kind: 'app', appId: 'gmail', pos: { x: 78, y: 14 }, r: 4.5 },
    { id: 'notion', kind: 'app', appId: 'notion', pos: { x: 78, y: 78 }, r: 4.5 },
    { id: 'formeon', kind: 'hub', pos: { x: 44, y: 42 }, r: 6 },
    { id: 'payments', kind: 'project', label: 'Payments Dashboard', pos: { x: 88, y: 42 }, r: 8 },
];

/** Six clean cross-tool links + one output link. No hub fan-in (that caused the starburst). */
const EDGES: EdgeDef[] = [
    { id: 'e1', from: 'microsoft', to: 'slack', label: 'meeting notes', labelPos: { x: 6, y: 29 } },
    { id: 'e2', from: 'slack', to: 'jira', label: 'spawns ticket', labelPos: { x: 6, y: 55 } },
    { id: 'e3', from: 'jira', to: 'notion', label: 'tracks initiative', curve: 30, labelPos: { x: 42, y: 84 } },
    { id: 'e4', from: 'gmail', to: 'slack', label: 'references thread', curve: -34, labelPos: { x: 42, y: 10 } },
    { id: 'e5', from: 'formeon', to: 'payments', label: 'unifies context', labelPos: { x: 64, y: 32 } },
    { id: 'e6', from: 'payments', to: 'notion', label: 'indexed', curve: 18, labelPos: { x: 88, y: 64 } },
    { id: 'e7', from: 'payments', to: 'gmail', label: 'captured', curve: -22, labelPos: { x: 88, y: 22 } },
];

function nodeMap(nodes: NodeDef[]) {
    return Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<string, NodeDef>;
}

function anchor(center: Pt, toward: Pt, radius: number): Pt {
    const dx = toward.x - center.x;
    const dy = toward.y - center.y;
    const len = Math.hypot(dx, dy) || 1;
    return {
        x: center.x + (dx / len) * radius,
        y: center.y + (dy / len) * radius,
    };
}

function buildPath(from: Pt, to: Pt, fromR: number, toR: number, curve = 0): string {
    const start = anchor(from, to, fromR);
    const end = anchor(to, from, toR);
    const mx = (start.x + end.x) / 2;
    const my = (start.y + end.y) / 2;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const len = Math.hypot(dx, dy) || 1;

    if (Math.abs(curve) < 0.5) {
        return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    }

    const cx = mx + (-dy / len) * curve;
    const cy = my + (dx / len) * curve;
    return `M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`;
}

function GraphCanvas({ inView, nodes }: { inView: boolean; nodes: Record<string, NodeDef> }) {
    const edges = useMemo(() => {
        return EDGES.map((edge) => {
            const a = nodes[edge.from];
            const b = nodes[edge.to];
            return {
                ...edge,
                d: buildPath(a.pos, b.pos, a.r, b.r, edge.curve ?? 0),
            };
        });
    }, [nodes]);

    return (
        <div className="absolute inset-0">
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden
            >
                <defs>
                    <pattern id="ontology-grid" width="5" height="5" patternUnits="userSpaceOnUse">
                        <circle cx="0.4" cy="0.4" r="0.25" fill="#CBD5E1" opacity="0.45" />
                    </pattern>
                    <marker
                        id="arrow"
                        viewBox="0 0 6 6"
                        refX="5"
                        refY="3"
                        markerWidth="5"
                        markerHeight="5"
                        orient="auto"
                    >
                        <path d="M0,0 L6,3 L0,6 Z" fill="#94A3B8" />
                    </marker>
                </defs>

                <rect width="100" height="100" fill="url(#ontology-grid)" opacity="0.35" />

                {edges.map((edge, i) => (
                    <motion.path
                        key={edge.id}
                        d={edge.d}
                        fill="none"
                        stroke="#94A3B8"
                        strokeWidth={1}
                        strokeLinecap="round"
                        markerEnd="url(#arrow)"
                        vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                        transition={{ duration: 0.55, delay: 0.08 + i * 0.05, ease }}
                    />
                ))}
            </svg>

            {edges
                .filter((e) => e.label && e.labelPos)
                .map((edge, i) => (
                    <motion.div
                        key={`${edge.id}-label`}
                        className="absolute z-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ left: `${edge.labelPos!.x}%`, top: `${edge.labelPos!.y}%` }}
                        initial={{ opacity: 0, y: 4 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                        transition={{ delay: 0.45 + i * 0.07, duration: 0.35, ease }}
                    >
                        <span className="inline-block px-1.5 py-[3px] rounded-full bg-white/95 border border-emerald-200/90 text-[7px] sm:text-[8px] font-medium text-emerald-800 whitespace-nowrap shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
                            {edge.label}
                        </span>
                    </motion.div>
                ))}

            {NODES.map((node, i) => (
                <GraphNode key={node.id} node={node} inView={inView} delay={0.15 + i * 0.04} />
            ))}
        </div>
    );
}

function GraphNode({
    node,
    inView,
    delay,
}: {
    node: NodeDef;
    inView: boolean;
    delay: number;
}) {
    const { pos } = node;

    return (
        <motion.div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
            transition={{ delay, duration: 0.4, ease }}
        >
            {node.kind === 'app' && (
                <AppIcon appId={node.appId} size="md" shape="rounded" className="ring-2 ring-white shadow-md bg-white" />
            )}
            {node.kind === 'hub' && (
                <motion.div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-[#6366F1]/25 shadow-[0_4px_16px_rgba(99,102,241,0.14)] flex items-center justify-center"
                    animate={
                        inView
                            ? {
                                  boxShadow: [
                                      '0 4px 16px rgba(99,102,241,0.1)',
                                      '0 6px 22px rgba(99,102,241,0.18)',
                                      '0 4px 16px rgba(99,102,241,0.1)',
                                  ],
                              }
                            : {}
                    }
                    transition={{ repeat: Infinity, duration: 3 }}
                >
                    <Image src="/formeon-logo.png" alt="" width={26} height={26} className="rounded-sm" />
                </motion.div>
            )}
            {node.kind === 'project' && (
                <div className="px-2.5 py-1.5 rounded-lg border-2 border-[#6366F1] bg-[#EEF2FF] shadow-sm">
                    <span className="text-[9px] sm:text-[10px] font-semibold text-[#6366F1] whitespace-nowrap">
                        {node.label}
                    </span>
                </div>
            )}
        </motion.div>
    );
}

export default function IntelligenceGraphAnimation() {
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: false, margin: '-80px', amount: 0.25 });
    const nodes = useMemo(() => nodeMap(NODES), []);

    return (
        <motion.div ref={ref} className="w-full">
            <AnimationFrame
                activeNav="graph"
                aspect="aspect-[2.2/1] min-h-[240px]"
                maxHeight="max-h-none"
                className="!max-h-[300px] sm:!max-h-[360px] md:!max-h-[400px]"
            >
                <div className="absolute inset-0 flex min-h-0">
                    <div className="relative flex-1 min-w-0 overflow-hidden">
                        <GraphCanvas inView={inView} nodes={nodes} />
                    </div>

                    <aside className="w-[28%] min-w-[120px] max-w-[150px] shrink-0 border-l border-[#EBEBEB] bg-[#FAFAFA] px-3 py-4 hidden md:flex flex-col justify-center">
                        <p className="text-[9px] uppercase tracking-wider text-slate-400 mb-1">Ontology</p>
                        <p className="font-serif-display text-sm text-slate-900 mb-3 leading-snug">Payments Dashboard</p>
                        <p className="text-[10px] text-slate-500 leading-relaxed mb-4">
                            How context flows across your stack.
                        </p>
                        <div className="space-y-1.5 pt-3 border-t border-slate-200 text-[10px]">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Entities</span>
                                <span className="font-semibold text-slate-800">7</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Relationships</span>
                                <span className="font-semibold text-slate-800">
                                    {inView ? <CountUp target={7} delay={0.8} /> : 0}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Sources</span>
                                <span className="font-semibold text-slate-800">5 tools</span>
                            </div>
                        </div>
                    </aside>
                </div>

                <p className="absolute bottom-2 left-1/2 -translate-x-1/2 md:left-[38%] text-[8px] uppercase tracking-[0.2em] text-slate-400 z-20 pointer-events-none">
                    Decision ontology
                </p>
            </AnimationFrame>
        </motion.div>
    );
}
