import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import FeedItem from '../FeedItems';
import { FavoritesProvider, FavoritesContext } from '../../../context/FavoritesContext';
import { PicsumPhoto } from '../types';


// Mock Ionicons - return a mock component
jest.mock('@expo/vector-icons', () => ({
 Ionicons: ({ name, size, color, testID }: any) => {
   const React = require('react');
   const { Text } = require('react-native');
   return React.createElement(Text, { testID: testID || `icon-${name}` }, `Icon:${name}`);
 },
}));


// Test wrapper with FavoritesProvider
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
 <FavoritesProvider>{children}</FavoritesProvider>
);


// Mock photo data
const mockPhoto: PicsumPhoto = {
 id: '123',
 author: 'John Doe',
 width: 500,
 height: 500,
 url: 'https://picsum.photos/id/123/500/500',
 download_url: 'https://picsum.photos/id/123/500/500',
};


const defaultProps = {
 photo: mockPhoto,
 size: 200,
 onPress: jest.fn(),
};


describe('FeedItem', () => {
 beforeEach(() => {
   jest.clearAllMocks();
 });


 describe('Snapshot Test', () => {
   it('should match snapshot when not liked', () => {
     // Use mock provider with loading: false to ensure component renders
     const MockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
       const mockContextValue = {
         favorites: [],
         loading: false,
         addFavorite: jest.fn(),
         removeFavorite: jest.fn(),
         isFavorite: jest.fn(() => false),
         loadFavorites: jest.fn(),
       };
      
       return (
         <FavoritesContext.Provider value={mockContextValue}>
           {children}
         </FavoritesContext.Provider>
       );
     };


     // Use @testing-library/react-native for snapshots - better with mocked components
     const { toJSON } = render(
       <MockProvider>
         <FeedItem {...defaultProps} />
       </MockProvider>
     );
    
     expect(toJSON()).toMatchSnapshot();
   });


   it('should match snapshot when liked', () => {
     // Mock context provider with favorite already added
     const mockFavorites = [
       {
         id: mockPhoto.id,
         uri: mockPhoto.download_url,
         author: mockPhoto.author,
         createdAt: new Date().toISOString(),
       },
     ];
    
     const MockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
       const mockContextValue = {
         favorites: mockFavorites,
         loading: false,
         addFavorite: jest.fn(),
         removeFavorite: jest.fn(),
         isFavorite: (id: string) => mockFavorites.some(f => f.id === id),
         loadFavorites: jest.fn(),
       };
      
       return (
         <FavoritesContext.Provider value={mockContextValue}>
           {children}
         </FavoritesContext.Provider>
       );
     };


     // Use @testing-library/react-native for snapshots - better with mocked components
     const { toJSON } = render(
       <MockProvider>
         <FeedItem {...defaultProps} />
       </MockProvider>
     );
    
     expect(toJSON()).toMatchSnapshot();
   });
 });


 describe('Rendering', () => {
   it('should render correctly with required props', () => {
     const { getByTestId } = render(
       <TestWrapper>
         <FeedItem {...defaultProps} />
       </TestWrapper>
     );


     const image = getByTestId('expo-image');
     expect(image).toBeTruthy();
   });


   it('should render with correct image URI based on photo ID and size', () => {
     const { getByTestId } = render(
       <TestWrapper>
         <FeedItem {...defaultProps} size={250} />
       </TestWrapper>
     );


     const image = getByTestId('expo-image');
     expect(image).toBeTruthy();
     // The URI should be constructed as: https://picsum.photos/id/{id}/{size}/{size}
     expect(image.props.accessibilityLabel).toBe(`https://picsum.photos/id/${mockPhoto.id}/250/250`);
   });


   it('should render heart icon', () => {
     const { getByText } = render(
       <TestWrapper>
         <FeedItem {...defaultProps} />
       </TestWrapper>
     );


     // Check if heart icon is rendered (outline when not liked)
     const icon = getByText(/Icon:heart-outline/i);
     expect(icon).toBeTruthy();
   });
 });


 describe('User Interactions', () => {
   it('should call onPress when photo is pressed', () => {
     const mockOnPress = jest.fn();
     const { getByTestId } = render(
       <TestWrapper>
         <FeedItem {...defaultProps} onPress={mockOnPress} />
       </TestWrapper>
     );


     const image = getByTestId('expo-image');
     fireEvent.press(image.parent);


     expect(mockOnPress).toHaveBeenCalledTimes(1);
   });


   it('should add favorite when heart is pressed (not liked)', async () => {
     const mockAddFavorite = jest.fn();
     const mockRemoveFavorite = jest.fn();
     const mockIsFavorite = jest.fn(() => false);
    
     const MockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
       const mockContextValue = {
         favorites: [],
         loading: false,
         addFavorite: mockAddFavorite,
         removeFavorite: mockRemoveFavorite,
         isFavorite: mockIsFavorite,
         loadFavorites: jest.fn(),
       };
      
       return (
         <FavoritesContext.Provider value={mockContextValue}>
           {children}
         </FavoritesContext.Provider>
       );
     };


     const { getByText } = render(
       <MockProvider>
         <FeedItem {...defaultProps} />
       </MockProvider>
     );


     const heartIcon = getByText(/Icon:heart-outline/i);
     const heartButton = heartIcon.parent;
    
     expect(heartButton).toBeTruthy();
    
     // Press the heart button to like
     fireEvent.press(heartButton);


     // Wait for the favorite to be added
     await waitFor(() => {
       expect(mockAddFavorite).toHaveBeenCalledWith(
         expect.objectContaining({
           id: mockPhoto.id,
           uri: mockPhoto.download_url,
           author: mockPhoto.author,
         })
       );
     });
    
     expect(mockRemoveFavorite).not.toHaveBeenCalled();
   });


   it('should remove favorite when heart is pressed (already liked)', async () => {
     const mockAddFavorite = jest.fn();
     const mockRemoveFavorite = jest.fn();
     const mockIsFavorite = jest.fn(() => true); // Already liked
    
     const MockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
       const mockContextValue = {
         favorites: [
           {
             id: mockPhoto.id,
             uri: mockPhoto.download_url,
             author: mockPhoto.author,
             createdAt: new Date().toISOString(),
           },
         ],
         loading: false,
         addFavorite: mockAddFavorite,
         removeFavorite: mockRemoveFavorite,
         isFavorite: mockIsFavorite,
         loadFavorites: jest.fn(),
       };
      
       return (
         <FavoritesContext.Provider value={mockContextValue}>
           {children}
         </FavoritesContext.Provider>
       );
     };


     const { getByText } = render(
       <MockProvider>
         <FeedItem {...defaultProps} />
       </MockProvider>
     );


     // When liked, should show filled heart
     const heartIcon = getByText(/Icon:heart/i);
     const heartButton = heartIcon.parent;
    
     expect(heartButton).toBeTruthy();
    
     // Press the heart button to unlike
     fireEvent.press(heartButton);


     // Wait for the favorite to be removed
     await waitFor(() => {
       expect(mockRemoveFavorite).toHaveBeenCalledWith(mockPhoto.id);
     });
    
     expect(mockAddFavorite).not.toHaveBeenCalled();
   });
 });


 describe('Props Handling', () => {
   it('should handle different photo sizes correctly', () => {
     const sizes = [100, 200, 300, 500];
    
     sizes.forEach((size) => {
       const { getByTestId } = render(
         <TestWrapper>
           <FeedItem {...defaultProps} size={size} />
         </TestWrapper>
       );


       const image = getByTestId('expo-image');
       expect(image).toBeTruthy();
       expect(image.props.accessibilityLabel).toBe(
         `https://picsum.photos/id/${mockPhoto.id}/${size}/${size}`
       );
     });
   });


   it('should handle different photo objects', () => {
     const differentPhoto: PicsumPhoto = {
       id: '456',
       author: 'Jane Smith',
       width: 800,
       height: 600,
       url: 'https://picsum.photos/id/456/800/600',
       download_url: 'https://picsum.photos/id/456/800/600',
     };


     const { getByTestId } = render(
       <TestWrapper>
         <FeedItem {...defaultProps} photo={differentPhoto} />
       </TestWrapper>
     );


     const image = getByTestId('expo-image');
     expect(image).toBeTruthy();
     expect(image.props.accessibilityLabel).toBe(
       `https://picsum.photos/id/${differentPhoto.id}/200/200`
     );
   });
 });


 describe('State Management', () => {
   it('should update heart icon when favorite status changes', async () => {
     const mockIsFavorite = jest.fn(() => false);
    
     const MockProvider: React.FC<{ children: React.ReactNode; isFavorite: boolean }> = ({
       children,
       isFavorite
     }) => {
       const mockContextValue = {
         favorites: isFavorite
           ? [{ id: mockPhoto.id, uri: mockPhoto.download_url, author: mockPhoto.author, createdAt: new Date().toISOString() }]
           : [],
         loading: false,
         addFavorite: jest.fn(),
         removeFavorite: jest.fn(),
         isFavorite: () => isFavorite,
         loadFavorites: jest.fn(),
       };
      
       return (
         <FavoritesContext.Provider value={mockContextValue}>
           {children}
         </FavoritesContext.Provider>
       );
     };


     const { rerender, queryByText } = render(
       <MockProvider isFavorite={false}>
         <FeedItem {...defaultProps} />
       </MockProvider>
     );


     // Initially should show outline heart (not liked)
     expect(queryByText(/Icon:heart-outline/i)).toBeTruthy();
     expect(queryByText(/Icon:heart$/i)).toBeNull();


     // Re-render with favorite status changed
     rerender(
       <MockProvider isFavorite={true}>
         <FeedItem {...defaultProps} />
       </MockProvider>
     );


     // After favorite is added, should show filled heart
     await waitFor(() => {
       expect(queryByText(/Icon:heart$/i)).toBeTruthy();
     });
   });
 });
});





