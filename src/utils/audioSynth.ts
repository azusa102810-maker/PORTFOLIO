/**
 * Procedural Web Audio Engine
 * Generates soothing ambient lo-fi chord progressions & sound effects
 * Zero external MP3 / audio file dependencies (no 404s!)
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private chordIndex: number = 0;
  private listeners: ((playing: boolean) => void)[] = [];

  // Soothing Pentatonic / Lofi Chord sequence (Frequencies in Hz)
  // Cmaj9 -> Am9 -> Fmaj7 -> G6
  private chords = [
    [261.63, 329.63, 392.00, 493.88, 587.33], // C, E, G, B, D (Cmaj9)
    [220.00, 261.63, 329.63, 392.00, 493.88], // A, C, E, G, B (Am9)
    [174.61, 261.63, 329.63, 392.00, 440.00], // F, C, E, G, A (Fmaj7/9)
    [196.00, 246.94, 293.66, 392.00, 440.00], // G, B, D, G, A (G6/9)
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

      // Lowpass filter for warm, cozy lo-fi tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      this.masterGain.connect(filter);
      filter.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(listener: (playing: boolean) => void) {
    this.listeners.push(listener);
    listener(!this.isMuted);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn(!this.isMuted));
  }

  public isPlaying(): boolean {
    return !this.isMuted;
  }

  public toggle(): boolean {
    if (this.isMuted) {
      this.play();
    } else {
      this.stop();
    }
    return !this.isMuted;
  }

  public play() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isMuted = false;
    this.notify();

    // Start chord loop
    this.playNextChord();
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = window.setInterval(() => {
      this.playNextChord();
    }, 4200);
  }

  public stop() {
    this.isMuted = true;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.notify();
  }

  private playNextChord() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const chord = this.chords[this.chordIndex];
    this.chordIndex = (this.chordIndex + 1) % this.chords.length;

    const now = this.ctx.currentTime;

    chord.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Gentle sine + triangle blend
      osc.type = i === 0 ? 'sine' : (i % 2 === 0 ? 'triangle' : 'sine');
      osc.frequency.setValueAtTime(freq, now);

      // Slight detune for warm chorus feel
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

      // Arpeggiate slightly
      const delay = i * 0.08;
      const startT = now + delay;
      const duration = 3.6;

      noteGain.gain.setValueAtTime(0, startT);
      noteGain.gain.linearRampToValueAtTime(0.045 / Math.sqrt(i + 1), startT + 0.35);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, startT + duration);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(startT);
      osc.stop(startT + duration + 0.1);
    });

    // Occasional gentle chime / sparkle
    if (Math.random() > 0.3) {
      setTimeout(() => {
        this.playChime(chord[Math.floor(Math.random() * chord.length)] * 2);
      }, 1600);
    }
  }

  public playChime(freq = 1046.5) {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 1.3);
  }

  // Whoosh sound when rotating island
  public playWhoosh() {
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.26);
    } catch {
      // Ignore audio glitches
    }
  }

  // Success chime when submitting contact form or reaching all stages
  public playSuccessSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.1);

      gain.gain.setValueAtTime(0.08, now + index * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.1 + 0.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + index * 0.1);
      osc.stop(now + index * 0.1 + 0.9);
    });
  }
}

export const soundEngine = new SoundEngine();
