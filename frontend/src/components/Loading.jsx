import React from "react";

export default function Loading({ message = "Loading..." }) {
    const overlay = {
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255,255,255,0.85)",
        zIndex: 9999,
        backdropFilter: "blur(4px)",
    };

    const box = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        color: "#222",
        fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    };

    const text = {
        fontSize: 14,
        letterSpacing: 0.2,
    };

    return (
        <div style={overlay} role="status" aria-live="polite" aria-label={message}>
            <div style={box}>
                <svg
                    width="64"
                    height="64"
                    viewBox="0 0 50 50"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <circle
                        cx="25"
                        cy="25"
                        r="20"
                        fill="none"
                        stroke="#e6e6e6"
                        strokeWidth="5"
                    />
                    <path
                        fill="none"
                        stroke="#0b72e3"
                        strokeWidth="5"
                        strokeLinecap="round"
                        d="M25 5 a20 20 0 0 1 0 40"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 25 25"
                            to="360 25 25"
                            dur="0.95s"
                            repeatCount="indefinite"
                        />
                    </path>
                </svg>
                <div style={text}>{message}</div>
            </div>
        </div>
    );
}