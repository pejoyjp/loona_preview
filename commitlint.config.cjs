module.exports = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      // 允许中文 subject
      headerPattern: /^(\w*)(?:\(([\w\-\/]+)\))?(!)?: (.+)$/,
      headerCorrespondence: ["type", "scope", "breaking", "subject"],
    },
  },
  rules: {
    // type 必须是下面这些
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "perf", "test", "chore"],
    ],

    // scope 可选
    "scope-empty": [0],

    // subject 不能为空
    "subject-empty": [2, "never"],

    // subject 不用校验大小写（允许中文）
    "subject-case": [0],

    // header 最大长度，可以根据需要调
    "header-max-length": [2, "always", 200],
  },
};
