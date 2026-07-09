import { Component, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { logError } from '../utils/errorLog';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message || 'Terjadi kesalahan tak terduga' };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    logError({
      source: 'react-error-boundary',
      message: error.message,
      stack: `${error.stack}\n\nComponent stack:${info.componentStack}`,
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-[#0A0A0C] p-4">
          <div className="max-w-sm w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/30 mb-4">
              <AlertTriangle className="w-7 h-7 text-red-500" />
            </div>
            <h2 className="font-bold text-lg text-slate-900 dark:text-white mb-1.5">Terjadi Kesalahan</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
              ResNeo Helper mengalami masalah teknis. Data klinis yang sudah tersimpan tetap aman. Silakan muat ulang aplikasi.
            </p>
            <p className="text-[10px] font-mono text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-lg p-2 mb-4 break-all">
              {this.state.message}
            </p>
            <button
              onClick={this.handleReload}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Muat Ulang Aplikasi
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
