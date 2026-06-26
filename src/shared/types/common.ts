// =============================================================================
// shared/types/common.ts
// 全项目通用的 TypeScript 工具类型
// =============================================================================

/** 允许 T 或 null */
export type Nullable<T> = T | null;

/** 允许 T 或 null 或 undefined */
export type Maybe<T> = T | null | undefined;

/** 成功/失败二元结果类型，替代 try/catch */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

/** 使对象的某些属性变为可选 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** 使对象的某些属性变为必填 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** 深度只读 */
export type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

/** 异步函数返回类型 */
export type AsyncReturnType<T extends (...args: unknown[]) => Promise<unknown>> =
  T extends (...args: unknown[]) => Promise<infer R> ? R : never;
