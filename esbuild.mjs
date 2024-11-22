import * as esbuild from 'esbuild';
import { esbuildPluginDecorator } from 'esbuild-plugin-decorator';

await esbuild.build({
  entryPoints: ['src/**/handler.ts'],
  outdir: 'dist/code',
  outbase: 'src',
  sourcemap: true,
  platform: 'node',
  target: 'node20',
  bundle: true,
  minify: true,
  external: [
    '@nestjs/microservices', 
    '@nestjs/platform-express', 
    '@nestjs/websockets/socket-module'
  ],
  plugins: [
    esbuildPluginDecorator({
      tsconfigPath: 'tsconfig.json',
    }),
  ],  
})