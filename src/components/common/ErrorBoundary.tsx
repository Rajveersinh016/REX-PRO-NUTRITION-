import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Rex-Pro Nutrition App:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--black-deep)', padding: 'var(--space-xl)', color: 'var(--white)', textAlign: 'center' }}>
          <div style={{ maxWidth: 480, background: 'var(--black-card)', border: '1px solid var(--gray-border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-2xl)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '50%', background: 'rgba(192, 57, 43, 0.15)', color: 'var(--red-light)', marginBottom: 'var(--space-lg)' }}>
              <AlertOctagon size={36} />
            </div>

            <h1 className="heading-lg" style={{ color: 'var(--white)', marginBottom: 'var(--space-sm)' }}>
              SOMETHING WENT WRONG
            </h1>

            <p style={{ color: 'var(--white-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 'var(--space-xl)' }}>
              An unexpected application error occurred. Don&apos;t worry, your cart and preferences are safe.
            </p>

            <button onClick={this.handleReset} className="btn btn-primary btn-lg btn-full" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <RotateCcw size={18} /> TRY AGAIN
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
