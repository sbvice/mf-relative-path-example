import './App.css';
import ConfettiButton from 'buttons/ConfettiButton';

const App = () => {
	return (
		<div className="content">
			<h1>State of Module Federation</h1>
			<p>
				What do you think about Module Federation?
				<span className='answers'>
					<ConfettiButton emojis={['🦄', '🌈']}>
						I love it!
					</ConfettiButton>
					<ConfettiButton emojis={['💩']}>
						I do not love it.
					</ConfettiButton>
				</span>
			</p>
		</div>
	);
};

export default App;
