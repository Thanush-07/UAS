// src/app/ErrorBoundary.jsx
import React from "react";
export default class ErrorBoundary extends React.Component{
  constructor(p){ super(p); this.state={error:null}; }
  static getDerivedStateFromError(error){ return {error}; }
  render(){
    if(this.state.error){
      return <div className="container"><div className="card">
        <h1 className="title">Something went wrong</h1>
        <p className="subtitle">Please refresh or try again later.</p>
      </div></div>;
    }
    return this.props.children;
  }
}
