import fs from 'node:fs';
// Preserve CI skips when local reference files are absent; allow renamed owner fixtures.
export const SAMPLE_PATH=process.env.BF_SAMPLE_PATH||['D:/PROMPTS - Prompts/businessflow-detleng/04 source-for tes.xlsx','D:/PROMPTS - Prompts/businessflow-detleng/9 source-for tes.xlsx'].find(path=>fs.existsSync(path))||'D:/PROMPTS - Prompts/businessflow-detleng/04 source-for tes.xlsx';
