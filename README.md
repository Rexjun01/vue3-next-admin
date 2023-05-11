### GIT 提交规范

信息提交格式为

> \<commit-type\>[(\<scope\>)]: \<commit-msg\> (#禅道号)

- `commit-type`：必填项，为对应提交类型，这里约定了`feat`,`fix`,`docs`,`style`,`refactor`,`perf`,`test`,`build`,`ci`,`chore`,`types`,`wip`,`revert`这些类别，具体代表的含义可以查看下面的*提交类别*说明。
- `scope`：可选必填项，用于描述改动的范围，如果一次 commit 修改多个模块，建议拆分成多次 commit，以便更好追踪和维护。
- `commit-msg`: 必填项，为提交信息的简要说明。
- 禅道号: 必填项，每一次提交必须对应一个禅道号，如果某次修改没有禅道号对应，请使用`#000`。需要注意的是，禅道号必须使用`#`开头，并且一个提交只能写一个禅道号，在有多个禅道 bug 的情况下，请将不同的 bug 进行拆分提交。

提交示例

```bash
# 在F9模块添加一个新功能
:冒号后面有空格，(#000)前有空格
git commit -m "feat(f9): F9中添加融资图谱模块 (#123)"

# 不指定具体模块
git commit -m "fix: 修复xxx不显示问题 (#666)"

# 当没有禅道号对应时
git commit -m "fix: xxx修复 (#000)"
```

**提交类别**

| 类别       | emoji | 含义                                                  |
| ---------- | ----- | ----------------------------------------------------- |
| `feat`     | ✨    | 新功能                                                |
| `fix`      | 🐛    | 修复 bug                                              |
| `docs`     | 📝    | 仅仅修改文档，比如 README, CHANGELOG, CONTRIBUTE 等等 |
| `style`    | 🎨    | 不改变代码逻辑 (仅仅修改了空格、格式缩进、逗号等等)   |
| `ui`       | 💄    | 样式调整                                              |
| `refactor` | ♻️    | 重构（既不修复错误也不添加功能）                      |
| `perf`     | ⚡️   | 优化相关，比如提升性能、体验                          |
| `test`     | ✅    | 增加测试，包括单元测试、集成测试等                    |
| `build`    | 👷    | 构建系统或外部依赖项的更改                            |
| `ci`       | 💚    | 自动化流程配置或脚本修改                              |
| `chore`    | 🔩    | 非 src 和 test 的修改，例如构建过程或辅助工具的变动   |
| `types`    | 🏷️    | 添加或更新类型                                        |
| `wip`      | 🚧    | 开发中                                                |
| `revert`   | ⏪    | 恢复先前的提交                                        |
| `typo`     | ⏪    | 拼写错误修复                                          |

### GIT 开发流程

**分支说明**

项目开发到发布会使用到如下分支：

- **master**： **线上分支**，预发环境测试通过后，将此分支代码编译发布到线上环境；
- **dev**： **开发分支**，开发人员每天都需要拉取/提交最新代码的分支；
- **test**： **测试分支**，开发人员开发完并自测通过后，发布到测试环境的分支；
- **bugfix**： **bug 修复分支**，线上环境出现 bug，需要切换到 bugfix 分支进行修复；
- **feature**： **功能开发分支**，以功能进行切分，创建分支；

**开发流程**

1. 开发人员每天都需要拉取/提交最新的代码到 `dev` 分支；
2. 开发人员开发完毕，开始集成测试(`dev`)，测试无误后提交到 `test` 分支并发布到测试环境，交由测试人员测试；
3. 测试通过后，发布到 `master` 分支上并打上标签（tag）；
4. 如果线上分支出了 bug ，这时候相关开发者应该基于预发布分支（没有预发环境，就使用 `master` 分支），新建一个 bug 分支用来临时解决 bug ，处理完后申请合并到 预发布 分支。这样做的好处就是：不会影响正在开发中的功能。

### GIT 使用流程

1. 如果自己分支不干净时，使用`git stash`添加暂存，如果是干净的可以跳过这一步；
2. 在分支上执行`git pull origin dev --rebase`，它的作用是将`dev`分支上的变动`rebase`到自己的分支上；
3. 如果出现冲突，解决后`git rebase --continue` 如果放弃此次 reabase，使用`git rebase --abort`取消；
4. 如果执行了第一步中的`stash`，此时还需要执行`git stash pop`恢复暂存的修改，如未执行步骤 1 则忽略，如出现冲突则继续解决冲突；
5. 最后提交代码到远端仓库 `git push origin [branch-name]`；
6. 到网页上，将自己分支的最新代码与 `dev` 对比，建一个 PR；
7. 预览当前 PR 的内容，并 merge 到 `dev` 分支。

#### rebase 出现冲突

1. 解决 conflict，然后继续 rebase `git rebase --continue`
2. 放弃此次 rebase 操作 `git rebase --abort`

#### 不想提交的代码

1. 将代码缓存到暂存区 `git stash`
2. 将暂存的代码取出来`git stash pop`

#### 误操作 git 导致代码丢失

1. 使用`git reflog`获取所有历史操作日志
2. 使用`git cherry-pick [reflog-id]`恢复某个分支的代码

### Git Tag 版本标签常用命令说明

```bash
# 默认在 HEAD 上创建一个标签
$ git tag v1.0
# 指定一个 commit id 创建一个标签
$ git tag v0.9 f52c633
# 创建带有说明的标签，用 -a 指定标签名，-m 指定说明文字
$ git tag -a v0.1 -m "version 0.1 released"

# 查看所有标签
# 注意：标签不是按时间顺序列出，而是按字母排序的。
$ git tag

# 查看单个标签具体信息
$ git show <tagname>

# 推送一个本地标签
$ git push origin <tagname>
# 推送全部未推送过的本地标签
$ git push origin --tags

# 删除本地标签
# 因为创建的标签都只存储在本地，不会自动推送到远程。
# 所以，打错的标签可以在本地安全删除。
$ git tag -d v0.1
# 删除一个远程标签（先删除本地 tag ，然后再删除远程 tag）
$ git push origin :refs/tags/<tagname>
```

更多详细用法请参考：https://www.liaoxuefeng.com/wiki/896043488029600/902335212905824
