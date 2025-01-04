/* eslint-disable */
/* cSpell: disable */
// @ts-nocheck
// This scripts checks the number of selected objects and adds the same number of new pages.
"use strict";

const pasteOptions = host.CreateStructPasteOptions();
pasteOptions.ColorConversionOptions.SourceColorProfileList =
	"sRGB IEC61966-2.1,U.S. Web Coated (SWOP) v2,Dot Gain 20%";

const selectedGroup = host.ActiveSelectionRange;
selectedGroup.Copy();

let pasted = host.ActiveDocument.Pages.Item(1)
	.Layers.Item("Layer 1")
	.PasteEx(pasteOptions);

const selectedObjects = pasted.UngroupEx();
host.ActiveSelection.Cut();

const numberOfObjects = selectedObjects.Count,
	pages = [];

host.ActiveDocument.InsertPagesEx(
	numberOfObjects,
	false,
	host.ActiveDocument.Pages.Item(2).Index,
	3.41333464566929,
	3.41333464566929,
);

for (let i = 1; i <= numberOfObjects; i++) {
	host.ActiveDocument.Pages.Item(i + 2)
		.Layers.Item("Layer 1")
		.PasteEx(pasteOptions);

	let currentSelected = host.ActiveSelectionRange;
	currentSelected.Item(1).RemoveFromSelection();
	currentSelected.Item(1).Fill.UniformColor.RGBAssign(255, 255, 255);
	currentSelected.Item(1).Outline.SetNoOutline();

	if (i !== numberOfObjects) {
		host.ActiveSelection.Cut();
	}
}
