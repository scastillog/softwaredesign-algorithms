  | Principle                        | Examples |
  | -------------------------------- | -------- |
  | Single Responsibility Principle  | [Class LayoutInfo](https://github.dev/microsoft/vscode/blob/d741dd215478407759ba872d69c910f9ef6edfb0/src/vs/workbench/contrib/callHierarchy/browser/callHierarchyPeek.ts#L44) |
  | Open / Closed Principle          | [Class FileStorage -> getItem](https://github.com/microsoft/vscode/blob/d741dd215478407759ba872d69c910f9ef6edfb0/src/vs/platform/state/node/stateService.ts#L53-L56)         |
  | Liskov Substitution Principle    | [Class StandardMouseEvent](https://github.com/microsoft/vscode/blob/d741dd215478407759ba872d69c910f9ef6edfb0/src/vs/base/browser/mouseEvent.ts#L30), [Subclass DragMouseEvent](https://github.com/microsoft/vscode/blob/d741dd215478407759ba872d69c910f9ef6edfb0/src/vs/base/browser/mouseEvent.ts#L91), [Subclass EditorMouseEvent](https://github.com/microsoft/vscode/blob/d741dd215478407759ba872d69c910f9ef6edfb0/src/vs/editor/browser/editorDom.ts#L104)          |
  | Interface Seggregation Principle | [Class EditorConfiguration](https://github.com/microsoft/vscode/blob/d741dd215478407759ba872d69c910f9ef6edfb0/src/vs/editor/browser/config/editorConfiguration.ts#L35)         |
  | Dependency Inversion Principle   | [Class DisposableStore](https://github.com/microsoft/vscode/blob/d741dd215478407759ba872d69c910f9ef6edfb0/src/vs/base/common/lifecycle.ts#L208)         |


| Anti SOLID                        | Examples |
  | -------------------------------- | -------- |
  | Anti-SRP          | [class WorkbenchList](https://github.com/microsoft/vscode/blob/d741dd215478407759ba872d69c910f9ef6edfb0/src/vs/platform/list/browser/listService.ts#L220) is used in a lot parts of the application with subclasses |
  | Anti-OCP          | [class DisposableStore](https://github.com/microsoft/vscode/blob/d741dd215478407759ba872d69c910f9ef6edfb0/src/vs/base/common/lifecycle.ts#L208) a lot of elements are disposables and the logic is not clear |
  | Anti-LSP    | [class SelectActionViewItem](https://github.com/microsoft/vscode/blob/d741dd215478407759ba872d69c910f9ef6edfb0/src/vs/base/browser/ui/actionbar/actionViewItems.ts#L416) is a subclass from [BaseActionViewItem](https://github.com/microsoft/vscode/blob/d741dd215478407759ba872d69c910f9ef6edfb0/src/vs/base/browser/ui/actionbar/actionViewItems.ts#L29) and you cand find a lot of subclasses from this classes  |
  | Anti-ISP | [interface IThemable](https://github.com/microsoft/vscode/blob/d741dd215478407759ba872d69c910f9ef6edfb0/src/vs/base/common/styler.ts#L10) this interface is fragmented in a lot of parts of the app |
  | Anti-DIP   | [interface IFindInputToggleOpts](https://github.com/microsoft/vscode/blob/d741dd215478407759ba872d69c910f9ef6edfb0/src/vs/base/browser/ui/findinput/findInputToggles.ts#L11) this interface is passed int he constructor in some classes making hard to understand the logic  |