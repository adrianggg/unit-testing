import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, cleanup } from '@testing-library/react';
  describe('Component ResultBox', () => {

  
  it('should render without crashing', () => {
        const testCases = [
            { amount: '100.00', from: 'PLN', to: 'USD' },
            { amount: '20.00', from: 'USD', to: 'PLN' },
            { amount: '200.00', from: 'PLN', to: 'USD' },
            { amount: '345.00', from: 'USD', to: 'PLN' },
        ];
            for(const testObj of testCases) {
            render(<ResultBox amount={parseInt(testObj.amount)} from={testObj.from} to={testObj.to} />);
            cleanup();
            }
        });
        it('should render proper info about conversion when PLN -> USD',()=>{
            const testCases = [
                { amount: '100.00', from: 'PLN', to: 'USD', outputAmount:'28.57' },
                { amount: '20.00', from: 'PLN', to: 'USD', outputAmount:'5.71' },
                { amount: '200.00', from: 'PLN', to: 'USD', outputAmount:'57.14'},
                { amount: '345.00', from: 'PLN', to: 'USD', outputAmount:'98.57'},
            ];
            for(const testObj of testCases) {
            render(<ResultBox amount={parseInt(testObj.amount)} from={testObj.from} to={testObj.to} />);
            const resultField = screen.getByTestId('resultDiv');
            expect(resultField).toHaveTextContent(`PLN ${testObj.amount} = $${testObj.outputAmount}`);
            cleanup();    
        }
        });
        it('should render proper info about conversion when USD -> PLN',()=>{
            const testCases = [
                { amount: '100.00', from: 'USD', to: 'PLN', outputAmount:'350.00' },
                { amount: '20.00', from: 'USD', to: 'PLN', outputAmount:'70' },
                { amount: '200.00', from: 'USD', to: 'PLN', outputAmount:'700.00'},
                { amount: '345.00', from: 'USD', to: 'PLN', outputAmount:'1,207.50'},
            ];
            for(const testObj of testCases) {
            render(<ResultBox amount={parseInt(testObj.amount)} from={testObj.from} to={testObj.to} />);
            const resultField = screen.getByTestId('resultDiv');
            expect(resultField).toHaveTextContent(`$${testObj.amount} = PLN ${testObj.outputAmount}`);
            cleanup();    
        }
        });
        it('should render proper info about conversion when equals',()=>{
            const testCases = [
                { amount: '100.00', from: 'PLN', to: 'PLN', outputAmount:'PLN 100.00' },
                { amount: '20.00', from: 'PLN', to: 'PLN', outputAmount:'PLN 20.00' },
                { amount: '200.00', from: 'USD', to: 'USD', outputAmount:'$200.00'},
                { amount: '345.00', from: 'USD', to: 'USD', outputAmount:'$345.00'},
            ];
            for(const testObj of testCases) {
            render(<ResultBox amount={parseInt(testObj.amount)} from={testObj.from} to={testObj.to} />);
            const resultField = screen.getByTestId('resultDiv');
            expect(resultField).toHaveTextContent(testObj.from === 'USD' ? `$${testObj.amount} = ${testObj.outputAmount}`:`PLN ${testObj.amount} = ${testObj.outputAmount}` );
            cleanup();    
        }
        });
        
        it('should render text "Wrong Value" when input is negative number',()=>{
            const testCases = [
                { amount: '-100.00', from: 'PLN', to: 'PLN', outputAmount:'PLN 100.00' },
                { amount: '-20.00', from: 'USD', to: 'PLN', outputAmount:'PLN 20.00' },
                { amount: '-200.00', from: 'USD', to: 'USD', outputAmount:'$200.00'},
                { amount: '-345.00', from: 'PLN', to: 'USD', outputAmount:'$345.00'},
            ];
            for(const testObj of testCases) {
            render(<ResultBox amount={parseInt(testObj.amount)} from={testObj.from} to={testObj.to} />);
            const resultField = screen.getByTestId('resultDiv');
            expect(resultField).toHaveTextContent('Wrong Value');
            cleanup();    
        }
        });
});