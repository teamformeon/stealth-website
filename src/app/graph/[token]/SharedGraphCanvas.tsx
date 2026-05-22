'use client';

// Read-only Intelligence Graph for the public share link.
//
// Visual parity with the desktop renderer (src/renderer/components/graph):
// project anchor at the center, evidence/capture nodes orbiting on a cola
// layout. Read-only: no drag-to-rewire, no right-panel edit affordances —
// just a clickable side panel showing the detail.

import { useEffect, useMemo, useRef, useState } from 'react';
import cytoscape, { type Core } from 'cytoscape';
import cola from 'cytoscape-cola';

interface EvidenceNode {
  id: string;
  source_type: string | null;
  dimension: string | null;
  summary: string | null;
  verbatim: string | null;
  speaker_name: string | null;
  deep_link: string | null;
  source_date: string | null;
}

interface Props {
  decisionId: string;
  decisionTitle: string;
  evidence: EvidenceNode[];
}

const SOURCE_COLOR: Record<string, string> = {
  slack: '#4A154B',
  jira: '#0052CC',
  confluence: '#0052CC',
  notion: '#1a1a1a',
  google_meet: '#00897B',
  google_docs: '#4285F4',
  gmail: '#EA4335',
  linear: '#5E6AD2',
  manual: '#94A3B8',
};

const sourceLabel = (s: string | null): string => {
  switch (s) {
    case 'slack':
      return 'Slack';
    case 'jira':
      return 'Jira';
    case 'confluence':
      return 'Confluence';
    case 'notion':
      return 'Notion';
    case 'google_meet':
      return 'Meet';
    case 'google_docs':
      return 'Docs';
    case 'gmail':
      return 'Gmail';
    case 'linear':
      return 'Linear';
    default:
      return 'Manual';
  }
};

const sourceColor = (s: string | null): string =>
  SOURCE_COLOR[s ?? 'manual'] ?? SOURCE_COLOR.manual;

const initials = (title: string): string => {
  const w = title.trim().split(/\s+/);
  return ((w[0]?.[0] ?? '') + (w[1]?.[0] ?? '')).toUpperCase() || '?';
};

// SVG-as-data-URL so the project anchor renders its initials inside the
// circle exactly like the desktop graph (see projectGlyph in IntelligenceGraph.tsx).
const projectGlyph = (title: string): string => {
  const ch = initials(title);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='76' height='76'><text x='38' y='49' font-size='28' font-family='Inter,Arial,sans-serif' font-weight='700' text-anchor='middle' fill='%236B4EFF'>${ch}</text></svg>`;
  return `data:image/svg+xml;utf8,${svg}`;
};

// Register cola exactly once per page lifetime.
let registered = false;
if (typeof window !== 'undefined' && !registered) {
  try {
    cytoscape.use(cola as unknown as cytoscape.Ext);
    registered = true;
  } catch {
    /* already registered (hot reload) */
  }
}

export default function SharedGraphCanvas({
  decisionId,
  decisionTitle,
  evidence,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<Core | null>(null);
  const [selected, setSelected] = useState<EvidenceNode | null>(null);

  const elements = useMemo(() => {
    const els: cytoscape.ElementDefinition[] = [
      {
        data: {
          id: `p:${decisionId}`,
          kind: 'project',
          label: decisionTitle,
          glyph: projectGlyph(decisionTitle),
        },
      },
    ];
    for (const ev of evidence) {
      const color = sourceColor(ev.source_type);
      els.push({
        data: {
          id: `e:${ev.id}`,
          kind: 'capture',
          label: ev.dimension ?? sourceLabel(ev.source_type),
          color,
          letter: sourceLabel(ev.source_type)[0],
          raw: ev,
        },
      });
      els.push({
        data: {
          id: `edge:${ev.id}`,
          source: `p:${decisionId}`,
          target: `e:${ev.id}`,
          color,
        },
      });
    }
    return els;
  }, [decisionId, decisionTitle, evidence]);

  // ─── Cytoscape lifecycle ────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      // Read-only — disable everything that lets users mutate the graph.
      userZoomingEnabled: true,
      userPanningEnabled: true,
      boxSelectionEnabled: false,
      autoungrabify: true,
      autounselectify: false,
      style: [
        {
          selector: 'node[kind="project"]',
          style: {
            width: 76,
            height: 76,
            shape: 'ellipse',
            'background-color': '#FFFFFF',
            'background-image': 'data(glyph)',
            'background-fit': 'contain',
            'background-clip': 'none',
            'border-width': 2.5,
            'border-color': '#6B4EFF',
            'shadow-blur': 28,
            'shadow-color': '#6B4EFF',
            'shadow-opacity': 0.22,
            'shadow-offset-x': 0,
            'shadow-offset-y': 4,
            label: 'data(label)',
            color: '#1a1a1a',
            'font-size': 13,
            'font-weight': 600,
            'text-valign': 'bottom',
            'text-margin-y': 10,
            'text-wrap': 'ellipsis',
            'text-max-width': '140px',
          } as unknown as cytoscape.Css.Node,
        },
        {
          selector: 'node[kind="capture"]',
          style: {
            width: 46,
            height: 46,
            shape: 'ellipse',
            'background-color': '#FFFFFF',
            'border-width': 2,
            'border-color': 'data(color)',
            'shadow-blur': 14,
            'shadow-color': '#0F172A',
            'shadow-opacity': 0.10,
            'shadow-offset-x': 0,
            'shadow-offset-y': 2,
            label: 'data(label)',
            color: '#475569',
            'font-size': 11,
            'font-weight': 500,
            'text-valign': 'bottom',
            'text-margin-y': 8,
            'text-wrap': 'ellipsis',
            'text-max-width': '120px',
          } as unknown as cytoscape.Css.Node,
        },
        {
          selector: 'edge',
          style: {
            width: 1.5,
            'line-color': 'data(color)',
            'curve-style': 'bezier',
            opacity: 0.32,
            'target-arrow-shape': 'none',
          } as unknown as cytoscape.Css.Edge,
        },
        {
          selector: 'node.hovered',
          style: {
            'shadow-opacity': 0.32,
            'z-index': 999,
          } as unknown as cytoscape.Css.Node,
        },
      ],
      layout: {
        name: 'cola',
        animate: true,
        edgeLength: 180,
        nodeSpacing: 30,
        randomize: false,
        avoidOverlap: true,
        maxSimulationTime: 1500,
      } as cytoscape.LayoutOptions,
    });

    cy.on('tap', 'node[kind="capture"]', (evt) => {
      const ev = evt.target.data('raw') as EvidenceNode;
      setSelected(ev);
    });
    cy.on('tap', (evt) => {
      if (evt.target === cy) setSelected(null);
    });
    cy.on('mouseover', 'node', (evt) => evt.target.addClass('hovered'));
    cy.on('mouseout', 'node', (evt) => evt.target.removeClass('hovered'));

    cyRef.current = cy;
    return () => {
      cy.destroy();
      cyRef.current = null;
    };
  }, [elements]);

  return (
    <div className="relative">
      <div
        className="relative rounded-3xl overflow-hidden border border-slate-200 bg-white"
        style={{ height: 540 }}
      >
        {/* Dot grid matching desktop canvas */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div ref={containerRef} className="absolute inset-0" />

        {/* Empty state */}
        {evidence.length === 0 && (
          <div className="absolute inset-x-0 bottom-6 text-center pointer-events-none">
            <p className="text-[12px] text-slate-400">
              No evidence captured for this decision yet.
            </p>
          </div>
        )}
      </div>

      {/* Read-only detail panel — slides up from below the canvas */}
      {selected && (
        <div className="mt-3 rounded-2xl bg-white border border-slate-200 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                <span
                  className="inline-flex items-center justify-center rounded"
                  style={{
                    background: sourceColor(selected.source_type),
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '2px 6px',
                  }}
                >
                  {sourceLabel(selected.source_type)}
                </span>
                {selected.dimension && <span>· {selected.dimension}</span>}
                {selected.source_date && (
                  <span>
                    · {new Date(selected.source_date).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                )}
              </div>
              {selected.verbatim ? (
                <blockquote
                  className="mt-3 text-[14px] text-slate-800 leading-relaxed"
                  style={{ borderLeft: '3px solid #6B4EFF', paddingLeft: 14 }}
                >
                  &ldquo;{selected.verbatim}&rdquo;
                </blockquote>
              ) : selected.summary ? (
                <p className="mt-3 text-[14px] text-slate-700 leading-relaxed">
                  {selected.summary}
                </p>
              ) : null}
              <div className="mt-3 flex items-center gap-2 text-[12px] text-slate-500">
                {selected.speaker_name && (
                  <span className="font-medium text-slate-700">
                    {selected.speaker_name}
                  </span>
                )}
                {selected.deep_link && (
                  <>
                    {selected.speaker_name && <span className="text-slate-300">·</span>}
                    <a
                      href={selected.deep_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6B4EFF] hover:underline"
                    >
                      View source
                    </a>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="text-slate-400 hover:text-slate-700 shrink-0"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
