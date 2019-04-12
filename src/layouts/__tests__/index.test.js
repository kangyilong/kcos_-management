import 'jest';
import BasicLayout from '..';
import React from 'react';
import renderer from 'react-test-renderer';
describe('Layout: BasicLayout', () => {
    it('Render correctly', () => {
        const wrapper = renderer.create(React.createElement(BasicLayout, null));
        expect(wrapper.root.children.length).toBe(1);
        const outerLayer = wrapper.root.children[0];
        expect(outerLayer.type).toBe('div');
        const title = outerLayer.children[0];
        expect(title.type).toBe('h1');
        expect(title.children[0]).toBe('Yay! Welcome to umi!');
    });
});
//# sourceMappingURL=index.test.js.map