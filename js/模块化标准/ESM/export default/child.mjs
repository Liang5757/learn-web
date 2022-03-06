let variable = 'value';
setTimeout(() => variable = 'new value');

export default variable;

// export default variable 被js引擎执行成
// const automaticallyCreatedVariable = 'value';
// export { automaticallyCreatedVariable as default };
